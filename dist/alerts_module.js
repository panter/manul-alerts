'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _alerts_service = require('./alerts_service');

var _alerts_service2 = _interopRequireDefault(_alerts_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  actions: _actions2.default,
  load: function load(context) {
    /* eslint no-param-reassign: 0 */
    context.Alerts = new _alerts_service2.default(context);
  }
};
//# sourceMappingURL=alerts_module.js.map