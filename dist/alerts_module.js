'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _alerts_service = require('./alerts_service');

var _alerts_service2 = _interopRequireDefault(_alerts_service);

exports['default'] = {
  actions: _actions2['default'],
  load: function load(context) {
    /* eslint no-param-reassign: 0 */
    context.Alerts = new _alerts_service2['default'](context);
  }
};
module.exports = exports['default'];
//# sourceMappingURL=alerts_module.js.map