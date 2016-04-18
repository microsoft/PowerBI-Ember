import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Route.extend({
  model() {
    return fetch('http://localhost:1248/api/reports/5dac7a4a-4452-46b3-99f6-a25915e0fe55')
      .then(response => response.json());
  }
});
