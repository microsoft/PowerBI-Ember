import Ember from 'ember';
import layout from '../templates/components/powerbi-report';

export default Ember.Component.extend({
  classNames: ['powerbi-frame'],
  layout,
  powerbi: Ember.inject.service('powerbi'),
  
  accessToken: '',
  component: null,
  embedUrl: null,
  options: null,
  
  didRender() {
    this._super(...arguments);
    
    if(this.validateAttributes()) {
      this.embed(this.$());
    }
    else if(this.component) {
      this.reset(this.$());
    }
  },
  
  embed(element) {
    const config = {
        type: 'report',
        embedUrl: this.embedUrl,
        accessToken: this.accessToken
    };
    
    Ember.$.extend(config, this.options);

    this.component = this.get('powerbi').embed(element, config);
  },
  
  reset(element) {
    this.get('powerbi').reset(element);
    this.component = null;
  },
  
  validateAttributes() {
    return !Ember.isEmpty(this.get('embedUrl')) && !Ember.isEmpty(this.get('accessToken'));
  },
  
  willDestroyElement() {
    this._super(...arguments);
    this.get('powerbi').reset(this.$());
  }
});
