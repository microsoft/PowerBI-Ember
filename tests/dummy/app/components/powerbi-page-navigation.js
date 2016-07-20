import Ember from 'ember';
import layout from '../templates/components/powerbi-page-navigation';

export default Ember.Component.extend({
  layout,

  cycleIsEnabled: false,

  actions: {
    cyclePageClicked() {
      this.toggleProperty('cycleIsEnabled');
      this.get('onCycleClicked')();
    },

    nextPageClicked() {
      this.get('onNextClicked')();
    },

    pageClicked(page) {
      this.get('onPageClicked')(page);
    },

    previousPageClicked() {
      this.get('onPreviousClicked')();
    }
  }
});
