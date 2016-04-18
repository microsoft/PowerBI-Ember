import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import sinon from 'sinon';

const fakeComponent = { fakeComponent: true };
const embedStub = sinon.stub();
embedStub.returns(fakeComponent);
const powerbiStub = Ember.Service.extend({
  embed: embedStub,
  remove: sinon.spy()
});

moduleForComponent('powerbi-component', 'Integration | Component | powerbi component', {
  integration: true,
  
  beforeEach: function () {
    this.register('service:powerbi', powerbiStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "locationService" within each test
    this.inject.service('powerbi', { as: 'powerbiService' });
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ms-powerbi-report}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ms-powerbi-report}}
      template block text
    {{/ms-powerbi-report}}
  `);

  assert.equal(this.$().text().trim(), '');
});

test('calls the internal .embed when component is rendered and attributes are valid', function () {
  const testData = {
    type: 'powerbi-report',
    embedUrl: 'http://embed.powerbi.com',
    accessToken: 'fakeToken1'
  };
  
  this.set('report', testData);
  
  this.render(hbs`{{powerbi-component report}}`);

  sinon.assert.calledOnce(this.get('powerbiService.embed'), this.$(), sinon.match.any);
});

test('does not call the internal .embed if attributes are invalid, but calls them after they become valid', function (assert) {
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  const testData = {
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('report', testData);
  
  this.render(hbs`{{powerbi-component report}}`);

  assert.ok(this.get('powerbiService.embed').notCalled);
  
  const validData = Ember.$.extend({ type: 'powerbi-report' }, testData);
  this.set('report', validData);
  
  sinon.assert.calledOnce(this.get('powerbiService.embed'), this.$(), sinon.match.any);
});

test('calls internal .embed with jquery element of the component and the correct configuration type for reports', function () {
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  const testData = {
    type: 'powerbi-report',
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('report', testData);
  
  this.render(hbs`{{powerbi-component report}}`);
  
  sinon.assert.calledOnce(this.get('powerbiService.embed'), this.$(), testData);
});

test('calls internal .remove with this.component', function () {
  // Manual beforeEach
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  // Arrange
  const testData = {
    type: 'powerbi-report',
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('report', testData);
  this.set('showReport', true);
  
  // Act
  this.render(hbs`{{#if showReport}}{{powerbi-component report}}{{/if}}`);
  sinon.assert.calledOnce(this.get('powerbiService.embed'));
  
  this.set('showReport', false);

  // Assert
  sinon.assert.calledWithExactly(this.get('powerbiService.remove'), fakeComponent);
});
