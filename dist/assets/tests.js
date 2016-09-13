define('dummy/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('dummy/tests/components/powerbi-filter-pane.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/powerbi-filter-pane.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/powerbi-filter-pane.js should pass jshint.');
  });
});
define('dummy/tests/components/powerbi-page-navigation.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/powerbi-page-navigation.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/powerbi-page-navigation.js should pass jshint.');
  });
});
define('dummy/tests/controllers/scenario2.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scenario2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scenario2.js should pass jshint.');
  });
});
define('dummy/tests/controllers/scenario3.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scenario3.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scenario3.js should pass jshint.');
  });
});
define('dummy/tests/controllers/scenario4.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scenario4.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scenario4.js should pass jshint.');
  });
});
define('dummy/tests/controllers/scenario6.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/scenario6.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/scenario6.js should pass jshint.');
  });
});
define('dummy/tests/ember-sinon-qunit/test', ['exports', 'ember', 'sinon', 'qunit', 'ember-qunit'], function (exports, _ember, _sinon, _qunit, _emberQunit) {
  exports['default'] = test;

  _sinon['default'].expectation.fail = _sinon['default'].assert.fail = function (msg) {
    _qunit['default'].ok(false, msg);
  };

  _sinon['default'].assert.pass = function (assertion) {
    _qunit['default'].ok(true, assertion);
  };

  _sinon['default'].config = {
    injectIntoThis: false,
    injectInto: null,
    properties: ['spy', 'stub', 'mock', 'sandbox'],
    useFakeTimers: false,
    useFakeServer: false
  };

  function test(testName, callback) {
    function sinonWrapper() {
      var context = this;
      if (_ember['default'].isBlank(context)) {
        context = {};
      }
      _sinon['default'].config.injectInto = context;

      return _sinon['default'].test(callback).apply(context, arguments);
    }

    return (0, _emberQunit.test)(testName, sinonWrapper);
  }
});
define('dummy/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('dummy/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('dummy/tests/helpers/json.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/json.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/json.js should pass jshint.');
  });
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _dummyTestsHelpersStartApp, _dummyTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _dummyTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _dummyTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('dummy/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('dummy/tests/helpers/register-select-helper', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('select', function (app, selector) {
      for (var _len = arguments.length, texts = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        texts[_key - 2] = arguments[_key];
      }

      var $options = app.testHelpers.findWithAssert(selector + ' option');

      $options.each(function () {
        var _this = this;

        var $option = _ember['default'].$(this);

        _ember['default'].run(function () {
          _this.selected = texts.some(function (text) {
            return $option.is(':contains(\'' + text + '\')');
          });
          $option.trigger('change');
        });
      });

      return app.testHelpers.wait();
    });
  };
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _dummyResolver, _dummyConfigEnvironment) {

  var resolver = _dummyResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _dummyConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _dummyConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('dummy/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/config/environment'], function (exports, _ember, _dummyApp, _dummyConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _dummyConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _dummyApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('dummy/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('dummy/tests/integration/components/powerbi-component-test', ['exports', 'ember-qunit', 'ember', 'sinon'], function (exports, _emberQunit, _ember, _sinon) {

  var fakeComponent = { fakeComponent: true };
  var embedStub = _sinon['default'].stub();
  embedStub.returns(fakeComponent);
  var powerbiStub = _ember['default'].Service.extend({
    embed: embedStub,
    reset: _sinon['default'].spy()
  });

  (0, _emberQunit.moduleForComponent)('powerbi-component', 'Integration | Component | powerbi component', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('service:powerbi', powerbiStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "locationService" within each test
      this.inject.service('powerbi', { as: 'powerbiService' });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'powerbi-component', ['loc', [null, [1, 0], [1, 21]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.4',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'powerbi-component', [], [], 0, null, ['loc', [null, [2, 4], [4, 26]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

  (0, _emberQunit.test)('calls the internal .embed when component is rendered and attributes are valid', function () {
    var testData = {
      type: 'report',
      embedUrl: 'http://embed.powerbi.com',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'), this.$(), _sinon['default'].match.any);
  });

  (0, _emberQunit.test)('does not call the internal .embed if attributes are invalid, but calls them after they become valid', function (assert) {
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.get('powerbiService.embed').notCalled);

    var validData = _ember['default'].$.extend({ type: 'report' }, testData);
    this.set('report', validData);

    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'), this.$(), _sinon['default'].match.any);
  });

  (0, _emberQunit.test)('calls internal .embed with jquery element of the component and the correct configuration type for reports', function () {
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    var testData = {
      type: 'report',
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'), this.$(), testData);
  });

  (0, _emberQunit.test)('calls internal .reset with jquery element before it is destroyed', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      type: 'report',
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);
    this.set('showReport', true);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': {
              'name': 'missing-wrapper',
              'problems': ['wrong-type']
            },
            'revision': 'Ember@2.4.4',
            'loc': {
              'source': null,
              'start': {
                'line': 1,
                'column': 0
              },
              'end': {
                'line': 1,
                'column': 46
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 38], [1, 44]]]]], [], ['loc', [null, [1, 18], [1, 46]]]]],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 53
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['block', 'if', [['get', 'showReport', ['loc', [null, [1, 6], [1, 16]]]]], [], 0, null, ['loc', [null, [1, 0], [1, 53]]]]],
        locals: [],
        templates: [child0]
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    var component = this.$().find('.powerbi-frame');
    this.set('showReport', false);

    // Assert
    _sinon['default'].assert.calledWithMatch(this.get('powerbiService.reset'), { 0: component[0] });
  });

  (0, _emberQunit.test)('calls internal .reset with jquery element when attributes become invalid', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      type: 'report',
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    var component = this.$().find('.powerbi-frame');
    this.set('report', null);

    // Assert
    _sinon['default'].assert.calledWithMatch(this.get('powerbiService.reset'), { 0: component[0] });
  });

  (0, _emberQunit.test)('does not call internal .reset when attributes are invalid unless component was already embedded', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      type: 'report',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));

    // Assert
    _sinon['default'].assert.notCalled(this.get('powerbiService.embed'));
    _sinon['default'].assert.notCalled(this.get('powerbiService.reset'));
  });

  (0, _emberQunit.test)('this.component is set to null after calling reset', function (assert) {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      type: 'report',
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('report', testData);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 28
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-component', [['get', 'report', ['loc', [null, [1, 20], [1, 26]]]]], [], ['loc', [null, [1, 0], [1, 28]]]]],
        locals: [],
        templates: []
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    this.set('report', null);

    // Assert
    assert.equal(this.get('component'), null);
  });
});
define('dummy/tests/integration/components/powerbi-component-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/powerbi-component-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/powerbi-component-test.js should pass jshint.');
  });
});
define('dummy/tests/integration/components/powerbi-report-test', ['exports', 'ember-qunit', 'ember', 'sinon'], function (exports, _emberQunit, _ember, _sinon) {

  var fakeComponent = { fakeComponent: true };
  var embedStub = _sinon['default'].stub();
  embedStub.returns(fakeComponent);
  var powerbiStub = _ember['default'].Service.extend({
    embed: embedStub,
    reset: _sinon['default'].spy()
  });

  (0, _emberQunit.moduleForComponent)('powerbi-report', 'Integration | Component | powerbi report', {
    integration: true,

    beforeEach: function beforeEach() {
      this.register('service:powerbi', powerbiStub);
      // Calling inject puts the service instance in the test's context,
      // making it accessible as "locationService" within each test
      this.inject.service('powerbi', { as: 'powerbiService' });
    }
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 18
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'powerbi-report', ['loc', [null, [1, 0], [1, 18]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.4',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'powerbi-report', [], [], 0, null, ['loc', [null, [2, 4], [4, 23]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

  (0, _emberQunit.test)('calls the internal .embed when component is rendered and attributes are valid', function (assert) {
    var testData = {
      embedUrl: 'http://embed.powerbi.com',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', testData.accessToken);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.get('powerbiService.embed').called);
  });

  (0, _emberQunit.test)('does not call the internal .embed if attributes are invalid, but calls them after they become valid', function (assert) {
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', null);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.ok(this.get('powerbiService.embed').notCalled);

    this.set('accessToken', testData.accessToken);

    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'), this.$(), _sinon['default'].match.any);
  });

  (0, _emberQunit.test)('calls internal .embed with jquery element of the component and the correct configuration type for reports', function () {
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', testData.accessToken);

    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));

    var expectedData = {
      type: 'report',
      embedUrl: testData.embedUrl,
      accessToken: testData.accessToken
    };

    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'), this.$(), _sinon['default'].match(expectedData));
  });

  (0, _emberQunit.test)('calls internal .reset with this.component', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', testData.accessToken);
    this.set('showReport', true);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': {
              'name': 'missing-wrapper',
              'problems': ['wrong-type']
            },
            'revision': 'Ember@2.4.4',
            'loc': {
              'source': null,
              'start': {
                'line': 1,
                'column': 0
              },
              'end': {
                'line': 1,
                'column': 78
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment('');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 44], [1, 52]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 65], [1, 76]]]]], [], []]], ['loc', [null, [1, 18], [1, 78]]]]],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 85
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['block', 'if', [['get', 'showReport', ['loc', [null, [1, 6], [1, 16]]]]], [], 0, null, ['loc', [null, [1, 0], [1, 85]]]]],
        locals: [],
        templates: [child0]
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    var component = this.$().find('.powerbi-frame');
    this.set('showReport', false);

    // Assert
    _sinon['default'].assert.calledWithMatch(this.get('powerbiService.reset'), { 0: component[0] });
  });

  (0, _emberQunit.test)('calls internal .reset with jquery element when attributes become invalid', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', testData.accessToken);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    var component = this.$().find('.powerbi-frame');
    this.set('embedUrl', null);

    // Assert
    _sinon['default'].assert.calledWithMatch(this.get('powerbiService.reset'), { 0: component[0] });
  });

  (0, _emberQunit.test)('does not call internal .reset when attributes are invalid unless component was already embedded', function () {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', null);
    this.set('accessToken', testData.accessToken);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));

    // Assert
    _sinon['default'].assert.notCalled(this.get('powerbiService.embed'));
    _sinon['default'].assert.notCalled(this.get('powerbiService.reset'));
  });

  (0, _emberQunit.test)('this.component is set to null after calling reset', function (assert) {
    // Manual beforeEach
    this.get('powerbiService.embed').reset();
    this.get('powerbiService.reset').reset();

    // Arrange
    var testData = {
      embedUrl: 'http://embed.powerbi.com/appTokenReportEmbed',
      accessToken: 'fakeToken1'
    };

    this.set('embedUrl', testData.embedUrl);
    this.set('accessToken', testData.accessToken);

    // Act
    this.render(_ember['default'].HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.4',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 60
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['inline', 'powerbi-report', [], ['embedUrl', ['subexpr', '@mut', [['get', 'embedUrl', ['loc', [null, [1, 26], [1, 34]]]]], [], []], 'accessToken', ['subexpr', '@mut', [['get', 'accessToken', ['loc', [null, [1, 47], [1, 58]]]]], [], []]], ['loc', [null, [1, 0], [1, 60]]]]],
        locals: [],
        templates: []
      };
    })()));
    _sinon['default'].assert.calledOnce(this.get('powerbiService.embed'));

    this.set('accessToken', null);
    _sinon['default'].assert.calledOnce(this.get('powerbiService.reset'));

    // Assert
    assert.equal(this.get('component'), null);
  });
});
define('dummy/tests/integration/components/powerbi-report-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/powerbi-report-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/powerbi-report-test.js should pass jshint.');
  });
});
define('dummy/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('dummy/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('dummy/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('dummy/tests/routes/scenario1.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scenario1.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scenario1.js should pass jshint.');
  });
});
define('dummy/tests/routes/scenario3.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scenario3.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scenario3.js should pass jshint.');
  });
});
define('dummy/tests/routes/scenario4.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scenario4.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scenario4.js should pass jshint.');
  });
});
define('dummy/tests/routes/scenario5.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scenario5.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scenario5.js should pass jshint.');
  });
});
define('dummy/tests/routes/scenario6.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/scenario6.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/scenario6.js should pass jshint.');
  });
});
define('dummy/tests/test-helper', ['exports', 'dummy/tests/helpers/resolver', 'ember-qunit'], function (exports, _dummyTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_dummyTestsHelpersResolver['default']);
});
define('dummy/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('dummy/tests/unit/services/powerbi-test', ['exports', 'ember-qunit', 'dummy/tests/ember-sinon-qunit/test'], function (exports, _emberQunit, _dummyTestsEmberSinonQunitTest) {

  (0, _emberQunit.moduleFor)('service:powerbi', 'Unit | Service | powerbi', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _dummyTestsEmberSinonQunitTest['default'])('it exists', function (assert) {
    var service = this.subject();

    assert.ok(service);
  });

  (0, _dummyTestsEmberSinonQunitTest['default'])('calls to .embed call the core service .embed and return the result', function (assert) {
    // Arrange
    var testData = {
      $element: $('<div></div>'),
      config: {},
      fakeComponent: {}
    };

    var service = this.subject();
    var originalPowerbi = service.get('powerbi');
    var embedStub = this.stub();
    embedStub.returns(testData.fakeComponent);
    var powerbiSpy = {
      embed: embedStub
    };
    service.set('powerbi', powerbiSpy);

    // Act
    var result = service.embed(testData.$element, testData.config);

    // Assert
    assert.ok(powerbiSpy.embed.calledWithExactly(testData.$element.get(0), testData.config));
    assert.equal(result, testData.fakeComponent);

    // Cleanup
    service.set('powerbi', originalPowerbi);
  });

  (0, _dummyTestsEmberSinonQunitTest['default'])('calls to .reset call the core service .reset', function (assert) {
    // Arrange
    var testData = {
      $element: $('<div></div>')
    };

    var service = this.subject();
    var originalPowerbi = service.get('powerbi');
    var powerbiSpy = {
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
});
define('dummy/tests/unit/services/powerbi-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services/powerbi-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/powerbi-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map