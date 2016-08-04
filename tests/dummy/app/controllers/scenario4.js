import Ember from 'ember';
import pbi from 'powerbi-client';

export default Ember.Controller.extend({
  report: null,
  reportPages: null,
  selectedRemoveFiltersPage: null,
  selectedRemoveFiltersVisual: null,

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
  }
});
