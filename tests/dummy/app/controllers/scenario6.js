import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Controller.extend({
  report: null,
  embedConfiguration: null,
  filterPaneEnabled: false,
  navContentPaneEnabled: false,

  init() {
    this._super();

    fetch('https://powerbiembedapi.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad')
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
