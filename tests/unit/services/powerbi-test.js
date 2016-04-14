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
  const fakeHtmlElement = {};
  const testData = {
    element: {
      get() {
        return fakeHtmlElement;
      }
    },
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
  const result = service.embed(testData.element, testData.config);
  
  // Assert
  assert.ok(powerbiSpy.embed.calledWithExactly(fakeHtmlElement, testData.config));
  assert.equal(result, testData.fakeComponent);
  
  // Cleanup
  service.set('powerbi', originalPowerbi);
});

test('calls to .remove call the core service .remove', function(assert) {
  // Arrange
  const testData = {
    component: {}
  };
  
  const service = this.subject();
  const originalPowerbi = service.get('powerbi');
  const powerbiSpy = {
    remove: this.spy()
  };
  service.set('powerbi', powerbiSpy);
  
  // Act
  service.remove(testData.component);
  
  // Assert
  assert.ok(powerbiSpy.remove.calledWithExactly(testData.component));
  
  // Cleanup
  service.set('powerbi', originalPowerbi);
});
