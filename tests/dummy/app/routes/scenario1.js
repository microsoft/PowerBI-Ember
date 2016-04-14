import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model() {
    return fetch('http://localhost:1248/api/reports/63f50faa-f1fe-40ed-ab33-67fb09b80251')
      .then(response => response.json());
  }
});
