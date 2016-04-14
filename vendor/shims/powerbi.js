(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Powerbi'] };
  }

  define('powerbi', [], vendorModule);
})();
