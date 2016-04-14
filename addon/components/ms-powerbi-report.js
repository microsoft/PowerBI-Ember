import Ember from 'ember';
import layout from '../templates/components/ms-powerbi-report';

export default Ember.Component.extend({
  classNames: ['powerbi-frame'],
  layout,
  powerbi: Ember.inject.service('powerbi'),
  
  accessToken: '',
  async: false,
  component: null,
  embedUrl: null,
  filter: '',
  filterPaneEnabled: false,
  
  didRender() {
    this._super(...arguments);
    
    if(this.validateAttributes()) {
      this.embed(this.$());
    }
  },
  
  validateAttributes() {
    return !Ember.isEmpty(this.get('embedUrl')) && !Ember.isEmpty(this.get('accessToken'));
  },
  
  embed(element) {
    const config = {
        type: 'powerbi-report',
        embedUrl: this.embedUrl,
        accessToken: this.accessToken,
        filterPaneEnabled: this.filterPaneEnabled,
        overwrite: true
    };

    this.component = this.get('powerbi').embed(element, config);
  },
  
  willDestroyElement() {
    this._super(...arguments);
    this.get('powerbi').remove(this.component);
  }
});
