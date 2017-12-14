import Ember from 'ember';
import layout from '../templates/components/powerbi-report';

export default Ember.Component.extend({
  classNames: ['powerbi-frame'],
  layout,
  powerbi: Ember.inject.service('powerbi'),

  accessToken: '',
  component: null,
  embedUrl: null,
  name: null,
  reportId: null,
  options: null,
  tokenType: null,

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
        accessToken: this.accessToken,
        id: this.reportId,
        uniqueId: this.name,
        tokenType: this.tokenType
    };

    Ember.$.extend(config, this.options);

    this.component = this.get('powerbi').embed(element, config);
    const action = this.get('onEmbedded');

    if (action) {
      action(this.component);
    }
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
