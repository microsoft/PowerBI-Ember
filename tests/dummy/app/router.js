import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('scenario1');
  this.route('scenario2');
  this.route('scenario3');
});

export default Router;
