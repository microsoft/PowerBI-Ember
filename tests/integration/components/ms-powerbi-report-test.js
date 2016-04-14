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

moduleForComponent('ms-powerbi-report', 'Integration | Component | ms powerbi report', {
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

test('calls the internal .embed when component is rendered and attributes are valid', function (assert) {
  const testData = {
    embedUrl: 'http://embed.powerbi.com',
    accessToken: 'fakeToken1'
  };
  
  this.set('embedUrl', testData.embedUrl);
  this.set('accessToken', testData.accessToken);
  
  this.render(hbs`{{ms-powerbi-report embedUrl=embedUrl accessToken=accessToken}}`);

  assert.ok(this.get('powerbiService.embed').called);
});

test('does not call the internal .embed if attributes are invalid, but calls them after they become valid', function (assert) {
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  const testData = {
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('embedUrl', testData.embedUrl);
  this.set('accessToken', null);
  
  this.render(hbs`{{ms-powerbi-report embedUrl=embedUrl accessToken=accessToken}}`);

  assert.ok(this.get('powerbiService.embed').notCalled);
  
  this.set('accessToken', testData.accessToken);
  
  sinon.assert.calledOnce(this.get('powerbiService.embed'), this.$(), sinon.match.any);
});

test('calls internal .embed with jquery element of the component and the correct configuration type for reports', function () {
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  const testData = {
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('embedUrl', testData.embedUrl);
  this.set('accessToken', testData.accessToken);
  
  this.render(hbs`{{ms-powerbi-report embedUrl=embedUrl accessToken=accessToken}}`);

  const expectedData = {
    type: 'powerbi-report',
    embedUrl: testData.embedUrl,
    accessToken: testData.accessToken
  };

  sinon.assert.calledOnce(this.get('powerbiService.embed'), this.$(), sinon.match(expectedData));
});

test('calls internal .remove with this.component', function () {
  // Manual beforeEach
  this.get('powerbiService.embed').reset();
  this.get('powerbiService.remove').reset();
  
  // Arrange
  const testData = {
    embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
    accessToken: 'fakeToken1'
  };
  
  this.set('embedUrl', testData.embedUrl);
  this.set('accessToken', testData.accessToken);
  this.set('showReport', true);
  
  // Act
  this.render(hbs`{{#if showReport}}{{ms-powerbi-report embedUrl=embedUrl accessToken=accessToken}}{{/if}}`);
  sinon.assert.calledOnce(this.get('powerbiService.embed'));
  
  this.set('showReport', false);

  // Assert
  sinon.assert.calledWithExactly(this.get('powerbiService.remove'), fakeComponent);
});
