import Ember from 'ember';
import powerbi from 'powerbi';

export default Ember.Service.extend({
  powerbi: null,

  init() {
    this._super(...arguments);
    this.set('powerbi', powerbi);
  },

  embed(jqueryElement, config) {
    return this.get('powerbi').embed(jqueryElement.get(0), config);
  },

  getx(jqueryElement) {
    return this.get('powerbi').get(jqueryElement.get(0));
  },

  find(uniqueId) {
    return this.get('powerbi').find(uniqueId);
  },

  reset(jqueryElement) {
    this.get('powerbi').reset(jqueryElement.get(0));
  }
});
