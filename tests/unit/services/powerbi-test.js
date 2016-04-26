import { moduleFor } from 'ember-qunit';
import test from 'dummy/tests/ember-sinon-qunit/test';

moduleFor('service:powerbi', 'Unit | Service | powerbi', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  
  assert.ok(service);
});

test('calls to .embed call the core service .embed and return the result', function(assert) {
  // Arrange
  const testData = {
    $element: $('<div></div>'),
    config: {},
    fakeComponent: {}
  };
  
  const service = this.subject();
  const originalPowerbi = service.get('powerbi');
  const embedStub = this.stub();
  embedStub.returns(testData.fakeComponent);
  const powerbiSpy = {
    embed: embedStub
  };
  service.set('powerbi', powerbiSpy);
  
  // Act
  const result = service.embed(testData.$element, testData.config);
  
  // Assert
  assert.ok(powerbiSpy.embed.calledWithExactly(testData.$element.get(0), testData.config));
  assert.equal(result, testData.fakeComponent);
  
  // Cleanup
  service.set('powerbi', originalPowerbi);
});

test('calls to .reset call the core service .reset', function(assert) {
  // Arrange
  const testData = {
    $element: $('<div></div>')
  };
  
  const service = this.subject();
  const originalPowerbi = service.get('powerbi');
  const powerbiSpy = {
    reset: this.spy()
  };
  service.set('powerbi', powerbiSpy);
  
  // Act
  service.reset(testData.$element);
  
  // Assert
  assert.ok(powerbiSpy.reset.calledWithExactly(testData.$element.get(0)));
  
  // Cleanup
  service.set('powerbi', originalPowerbi);
});
