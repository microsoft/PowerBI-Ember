import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Controller.extend({
  report: null,
  embedConfiguration: null,
  filterPaneEnabled: false,
  navContentPaneEnabled: false,

  init() {
    this._super();

    fetch('https://powerbiembedapi.azurewebsites.net/api/dxt/reports/c4d31ef0-7b34-4d80-9bcb-5974d1405572')
      .then(response => response.json())
      .then(embedConfiguration => {
        this.set('embedConfiguration', Ember.$.extend(embedConfiguration, {
          settings: {
            filterPaneEnabled: this.get('filterPaneEnabled'),
            navContentPaneEnabled: this.get('navContentPaneEnabled')
          }
        }));
      });
  },

  actions: {
    onEmbedded(report) {
      console.log('embedded settings report');
      this.report = report;
    },

    toggleFilterPaneClicked() {
      console.log('toggleFilterPaneClicked');
      this.toggleProperty('filterPaneEnabled');
      this.report.updateSettings({
        filterPaneEnabled: this.get('filterPaneEnabled')
      });
    },

    toggleNavContentPaneClicked() {
      console.log('toggleNavContentPaneClicked');
      this.toggleProperty('navContentPaneEnabled');
      this.report.updateSettings({
        navContentPaneEnabled: this.get('navContentPaneEnabled')
      });
    }
  }
});
