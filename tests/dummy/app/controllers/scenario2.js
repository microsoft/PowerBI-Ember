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
        report.type = 'report';
        report.filterPaneEnabled = this.get('filterPaneEnabled');
        this.set('report', report);
      });
  },
  
  actions: {
    autoComplete() {
      run.debounce(this, this.findReports, 500);
    },
    
    embedReport(report) {
      this.findReportById(report.id);
    }
  }
});
