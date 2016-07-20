import Ember from 'ember';
import fetch from 'ember-network/fetch';

const {
  run
} = Ember;

export default Ember.Controller.extend({
  apiBaseUrl: 'http://powerbipaasapi.azurewebsites.net',
  filter: null,
  filterPaneEnabled: false,
  reports: null,
  report: null,
  
  findAllReports() {
    return fetch(`${this.apiBaseUrl}/api/reports`)
      .then(response => response.json())
      .then(reports => {
        this.set('reports', reports);
      });
  },
  
  findReports() {
    return fetch(`${this.apiBaseUrl}/api/reports?query=${this.get('filter')}`)
      .then(response => response.json())
      .then(reports => {
        this.set('reports', reports);
      });
  },
  
  findReportById(reportId) {
    return fetch(`${this.apiBaseUrl}/api/reports/${reportId}`)
      .then(response => response.json())
      .then(report => {
        Ember.$.extend(report, {
          type: 'report',
          embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed',
          id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
          accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2OTAzOTM0NSwiZXhwIjoxNDY5MDQyOTQ1fQ.vMFKofPrASKsiULThLkUqNhURFWobQ6pHIkbIM3kOng',
          settings: {
            filterPaneEnabled: this.get('filterPaneEnabled')
          }
        });

        this.set('report', report);
      });
  },
  
  actions: {
    autoComplete() {
      run.debounce(this, this.findReports, 500);
    },
    
    embedReport(report) {
      this.findReportById(report.id);
    },
    
    resetClicked() {
      this.set('report', null);
    },
    
    showAllClicked() {
      this.findAllReports();
    },
    
    submitForm() {
      this.findReports();
    }
  }
});
