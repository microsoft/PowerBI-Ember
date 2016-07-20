(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['powerbi'] };
  }

  define('powerbi', [], vendorModule);
})();
