import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Controller.extend({
  report: null,
  embedConfiguration: null,
  filterPaneEnabled: false,
  navContentPaneEnabled: false,

  init() {
    this._super();

    fetch('http://powerbipaasapi.azurewebsites.net/api/reports/5dac7a4a-4452-46b3-99f6-a25915e0fe55')
      .then(response => response.json())
      .then(embedConfiguration => {
        this.set('embedConfiguration', Ember.$.extend(embedConfiguration, {
          type: 'report',
          embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?unmin=true',
          id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2OTEzMTg2NiwiZXhwIjoxNDY5MTM1NDY2fQ.4tm46eXWDo1kG36fsBFRbNX1HsoPAMw2QAVitmERSaQ',
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
