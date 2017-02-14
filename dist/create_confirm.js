'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mantraCore = require('mantra-core');

var composer = function composer(_ref, onData) {
  var context = _ref.context;

  var _context2 = context();

  var Alerts = _context2.Alerts;

  var _Alerts$getConfirm = Alerts.getConfirm();

  var message = _Alerts$getConfirm.message;
  var onCancel = _Alerts$getConfirm.onCancel;
  var onConfirm = _Alerts$getConfirm.onConfirm;

  onData(null, { message: message, onCancel: onCancel, onConfirm: onConfirm });
};

exports.composer = composer;
var depsMapper = function depsMapper(_context) {
  return {
    context: function context() {
      return _context;
    }
  };
};

exports.depsMapper = depsMapper;

exports['default'] = function (C) {
  return (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(C);
};
//# sourceMappingURL=create_confirm.js.map