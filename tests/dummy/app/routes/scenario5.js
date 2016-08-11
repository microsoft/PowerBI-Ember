import Ember from 'ember';
import fetch from 'ember-network/fetch';
import pbi from 'powerbi-client';

const filter = new pbi.models.AdvancedFilter({
  table: "Store",
  column: "Name"
}, "Or", {
    operator: "Contains",
    value: "Wash"
  },
  {
    operator: "Contains",
    value: "Park"
  });

export default Ember.Route.extend({
  model() {
    return fetch('https://powerbiembedapi.azurewebsites.net/api/dxt/reports/c4d31ef0-7b34-4d80-9bcb-5974d1405572')
      .then(response => response.json())
      .then(embedConfiguration => {
        return Ember.$.extend(embedConfiguration, {
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: true
          },
          filter,
          pageName: 'ReportSection2'
        });
      });
  }
});