import Ember from 'ember';

export function json(params/*, hash*/) {
  return JSON.stringify(params, null, '');
}

export default Ember.Helper.helper(json);
