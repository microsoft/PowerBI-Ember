import Ember from 'ember';
import Powerbi from 'powerbi';

export default Ember.Service.extend({
  powerbi: null,
  
  init() {
    this._super(...arguments);
    this.set('powerbi', new Powerbi());
  },
  
  embed(jqueryElement, config) {
    return this.get('powerbi').embed(jqueryElement.get(0), config);
  },
  
  remove(component) {
    this.get('powerbi').remove(component);
  }
});
