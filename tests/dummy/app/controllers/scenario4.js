import Ember from 'ember';
import pbi from 'powerbi-client';

export default Ember.Controller.extend({
  report: null,
  reportPages: null,
  selectedRemoveFiltersPage: null,
  selectedRemoveFiltersVisual: null,
  filtersNode: null,

  init() {
    this._super();

    this.set('filtersNode', Ember.Object.create({
      name: undefined,
      filterable: null,
      filters: Ember.A(),
      nodes: Ember.A()
    }));
  },

  actions: {
    onEmbedded(report) {
      console.log(`Coponent was embedded: `, report);

      this.set('report', report);

      report.on('loaded', () => {
        report.getPages()
          .then(pages => {
            this.set('reportPages', pages);
            if (pages.length > 0) {
              this.set('activePage', pages[0]);
            }
          });
      });

      report.on('pageChanged', event => {
        const page = event.detail.newPage;
        this.set('activePage', page);
      });
    },

    setFilters(filter, filterable) {
      console.log('setFilters', filter, filterable);
      filterable.setFilters([filter]);
    },

    removeReportFiltersClicked() {
      console.log('removeReportFiltersClicked');
      this.report.removeFilters();
    },

    removePageFiltersClicked(page) {
      console.log('removePageFiltersClicked', page);
      page.removeFilters();
    },

    removeVisualFiltersClicked(visual) {
      console.log('removeVisualFiltersClicked', visual);
      throw new Error(`Referencing visuals is not implemented`);
      // visual.removeFilters();
    },

    refreshFilters() {
      console.log('controller, refresh filters');

      this.get('report').getFilters()
        .then(filters => {
          this.set('filtersNode.filters', filters);
        });

      const pageNodePromises = this.get('reportPages')
        .map(page => {
          return page.getFilters()
            .then(filters => {
              let node;
              let filteredNodes = this.get('filtersNode.nodes').filter(node => node.name === page.name);
              if (filteredNodes.length === 1) {
                node = filteredNodes[0];
                node.set('filters', Ember.A(filters));
              }
              else {
                const newNode = Ember.Object.create({
                  name: page.name,
                  filterable: null,
                  filters: Ember.A(filters),
                  nodes: Ember.A()
                });

                this.get('filtersNode.nodes').pushObject(newNode);
              }
            });
        });

      Ember.RSVP.Promise.all(pageNodePromises)
        .then(() => {
          console.log('refresh done', this.get('filtersNode'));
        });
    },

    removeFilter(filterToRemove, filterableName) {
      console.log('controller, remove filter');

      let filterable;
      let filtersNode;

      if (!filterableName) {
        filterable = this.get('report');
        filtersNode = this.get('filtersNode');
      }
      else {
        let filteredPages = this.get('reportPages').filter(page => page.name === filterableName);
        if (filteredPages.length !== 1) {
          throw new Error(`Could not find filterable object matching name: ${filterableName}.  There is likely a problem with how the filterableName is being assigned in event.`);
        }

        filterable = filteredPages[0];

        let filteredNodes = this.filtersNode.get('nodes').filter(node => node.name === filteredPages[0].name);
        if (filteredNodes.length !== 1) {
          throw new Error(`Could not find node matching name: ${filteredPages[0].name}.`);
        }

        filtersNode = filteredNodes[0];
      }

      return filterable.getFilters()
        .then(filters => {
          let index = -1;
          filters.some((filter, i) => {
            if (this.areFiltersEqual(filter, filterToRemove)) {
              index = i;
              return true;
            }
          });

          if (index !== -1) {
            filters.splice(index, 1);
            return filterable.setFilters(filters)
              .then(() => {
                filtersNode.set('filters', filters);
              });
          }

          return Ember.RSVP.Promise.reject(new Error('Could not find filter'));
        });
    },

    predefinedFilter1Clicked() {
      console.log('predefinedFilter1Clicked');
      const predefinedFilter1 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
      }, "Or",
        {
          operator: "Contains",
          value: "Direct"
        },
        {
          operator: "None",
          value: "x"
        }
      );

      this.report.setFilters([predefinedFilter1.toJSON()]);
    },

    predefinedFilter2Clicked() {
      console.log('predefinedFilter2Clicked');
      const predefinedFilter2 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
      }, "Or",
        {
          operator: "Contains",
          value: "Wash"
        },
        {
          operator: "Contains",
          value: "Park"
        }
      );

      this.report.setFilters([predefinedFilter2.toJSON()]);
    },

    predefinedFilter3Clicked() {
      console.log('predefinedFIlter3Clicked');
      const predefinedFilter3 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
      }, "Or",
        {
          operator: "Contains",
          value: "Wash"
        },
        {
          operator: "Contains",
          value: "Park"
        }
      );

      this.report.page('ReportSection2').setFilters([predefinedFilter3.toJSON()]);
    }
  },

  areFiltersEqual(filterA, filterB) {
    let filterAType = pbi.models.getFilterType(filterA);
    let filterATarget = filterA.target;
    let advancedFilterA;
    let basicFilterA;
    let filterBType = pbi.models.getFilterType(filterB);
    let filterBTarget = filterB.target;
    let advancedFilterB;
    let basicFilterB;

    if (filterAType === pbi.models.FilterType.Advanced) {
      advancedFilterA = filterA;
    }
    else if (filterAType === pbi.models.FilterType.Basic) {
      basicFilterA = filterA;
    }

    if (filterBType === pbi.models.FilterType.Advanced) {
      advancedFilterB = filterB;
    }
    else if (filterBType === pbi.models.FilterType.Basic) {
      basicFilterB = filterB;
    }

    const areTargetsEqual = filterATarget.table === filterBTarget.table &&
      filterATarget.column === filterBTarget.column &&
      filterATarget.hierarchy === filterBTarget.hierarchy &&
      filterATarget.hierarchyLevel === filterBTarget.hierarchyLevel &&
      filterATarget.measure === filterBTarget.measure;

    if (!areTargetsEqual) {
      return false;
    }

    if (advancedFilterA && advancedFilterB) {
      return advancedFilterA.logicalOperator === advancedFilterB.logicalOperator &&
        advancedFilterA.conditions.every(condition => {
          return advancedFilterB.conditions.some(conditionB => {
            return condition.operator === conditionB.operator &&
              condition.value === conditionB.value;
          });
        })
        ;
    }
    else if (basicFilterA && basicFilterB) {
      return basicFilterA.operator === basicFilterB.operator &&
        basicFilterA.values.every(value => {
          return basicFilterB.values.some(valueB => valueB === value);
        });
    }

    return false;
  }
});
