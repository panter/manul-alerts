'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _mantraCore = require('mantra-core');

var _recompose = require('recompose');

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
  return (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper), _recompose.pure)(C);
};
//# sourceMappingURL=create_confirm.js.map