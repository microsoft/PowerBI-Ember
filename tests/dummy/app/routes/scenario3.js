import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model() {
    return fetch('http://powerbipaasapi.azurewebsites.net/api/reports/5dac7a4a-4452-46b3-99f6-a25915e0fe55')
      .then(response => response.json())
      .then(embedConfiguration => {
        return Ember.$.extend(embedConfiguration, {
          embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?unmin=true',
          id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ3MDMzMDM4NywiZXhwIjoxNDcwMzMzOTg3fQ.UtqfOTWYhaNqAWaF43X98VGjVk3vaV-Vl-MkQtypPJQ',
          settings: {
            navContentPaneEnabled: false
          }
        });
      });
  }
});
