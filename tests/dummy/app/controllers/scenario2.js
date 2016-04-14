import Ember from 'ember';
import fetch from 'ember-network/fetch';

const {
  run
} = Ember;

export default Ember.Controller.extend({
  filter: null,
  reports: null,
  report: null,
  
  findReports() {
    return fetch(`http://localhost:1248/api/reports?query=${this.get('filter')}`)
      .then(response => response.json())
      .then(reports => {
        this.set('reports', reports);
      });
  },
  
  findReportById(reportId) {
    return fetch(`http://localhost:1248/api/reports/${reportId}`)
      .then(response => response.json())
      .then(report => {
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
