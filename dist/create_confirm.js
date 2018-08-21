'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _pure2 = require('recompose/pure');

var _pure3 = _interopRequireDefault(_pure2);

var _mantraCore = require('@storybook/mantra-core');

var _composeWithTracker = require('./utils/composeWithTracker');

var _composeWithTracker2 = _interopRequireDefault(_composeWithTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context;

  var _context = context(),
      Alerts = _context.Alerts;

  var confirmProps = Alerts.getConfirm();
  onData(null, confirmProps);
};

var depsMapper = exports.depsMapper = function depsMapper(_context2) {
  return {
    context: function context() {
      return _context2;
    }
  };
};

exports.default = function (C) {
  return (0, _mantraCore.composeAll)((0, _composeWithTracker2.default)(composer), (0, _mantraCore.useDeps)(depsMapper), _pure3.default)(C);
};
//# sourceMappingURL=create_confirm.js.map