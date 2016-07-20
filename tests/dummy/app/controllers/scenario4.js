import Ember from 'ember';
import pbi from 'powerbi-client';

export default Ember.Controller.extend({
  report: null,
  reportPages: null,
  selectedRemoveAllFilterPage: null,
  selectedRemoveAllFilterVisual: null,

  actions: {
    onEmbedded(report) {
      console.log(`Coponent was embedded: `, report);

      this.set('report', report);

      report.on('loaded', event => {
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

    addFilter(filter, target) {
      console.log('addFilter', filter, target);
      this.report.addFilter(filter, target);
    },

    removeAllReportFiltersClicked() {
      console.log('removeAllReportFiltersClicked');
      this.report.removeAllFilters();
    },

    removeAllPageFiltersClicked(page) {
      console.log('removeAllPageFiltersClicked', page);
      const target = {
        type: "page",
        name: page.name
      };
      this.report.removeAllFilters(target);
    },

    removeAllVisualFiltersClicked(visualId) {
      console.log('removeAllVisualFiltersClicked', visualId);
      const target = {
        type: "visual",
        id: visualId
      };
      this.report.removeAllFilters(target);
    },

    predefinedFilter1Clicked() {
      console.log('predefinedFilter1Clicked');
      const predefinedFilter1 = new pbi.models.AdvancedFilter({
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

      this.report.addFilter(predefinedFilter1.toJSON());
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

      this.report.addFilter(predefinedFilter2.toJSON());
    },

    predefinedFIlter3Clicked() {
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
      const predefinedTarget3 = {
        type: "page",
        name: "ReportSection2"
      };

      this.report.addFilter(predefinedFilter3.toJSON(), predefinedTarget3);
    }
  }
});
