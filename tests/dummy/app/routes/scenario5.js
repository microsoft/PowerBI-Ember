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
    return fetch('https://powerbiembedapi.azurewebsites.net/api/reports/c52af8ab-0468-4165-92af-dc39858d66ad')
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