(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['powerbi-client'] };
  }

  define('powerbi-client', [], vendorModule);
})();
