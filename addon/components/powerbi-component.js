import Ember from 'ember';
import layout from '../templates/components/powerbi-component';

const PowerBiComponent = Ember.Component.extend({
  classNames: ['powerbi-frame'],
  layout,
  powerbi: Ember.inject.service('powerbi'),
  
  component: null,
  options: null,
  validationMap: null,
    
  init() {
    this._super(...arguments);
    
    this.set('validationMap', {
        'report': this.validateReportOptions
    });
  },
  
  didInsertElement() {
    this._super(...arguments);
    
    const options = this.get('options');
    if(this.validateOptions(options)) {
      this.embed(this.$(), options);
    }
  },
  
  didUpdateAttrs() {
    this._super(...arguments);
    
    const options = this.get('options');
    if(this.validateOptions(options)) {
      this.embed(this.$(), options);
    }
    else if(this.component) {
      this.reset(this.$());
    }
  },
  
  embed(element, options) {
    this.component = this.get('powerbi').embed(element, options);
  },
  
  reset(element) {
    this.get('powerbi').reset(element);
    this.component = null;
  },
  
  validateOptions(options) {
    if (!options ||
      !(typeof options.embedUrl === 'string' && options.embedUrl.length > 0) ||
      !(typeof options.accessToken === 'string' && options.accessToken.length > 0)
    ) {
      return false;
    }

    if(this.validationMap.hasOwnProperty(options.type) && typeof this.validationMap[options.type] === "function") {
      return this.validationMap[options.type](options);
    }
    else {
      return false;
    }
  },
    
  validateReportOptions(/* options */) {
      return true;
  },
  
  willDestroyElement() {
    this._super(...arguments);
    this.get('powerbi').reset(this.$());
  }
});

PowerBiComponent.reopenClass({
  positionalParams: ['options']
});

export default PowerBiComponent;
