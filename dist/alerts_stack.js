'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _reactNotification = require('react-notification');

// some aliassing for ReactNotificationStack
var transformAlerts = function transformAlerts(alerts, defaultStyles, stylesError) {
  return alerts.map(function (_ref) {
    var onActionClick = _ref.onActionClick;
    var actionLabel = _ref.actionLabel;
    var type = _ref.type;

    var alert = _objectWithoutProperties(_ref, ['onActionClick', 'actionLabel', 'type']);

    return _extends(_extends({}, defaultStyles, type === 'error' && stylesError), alert, {
      action: actionLabel,
      onClick: onActionClick
    });
  });
};
var AlertStack = function AlertStack(_ref2) {
  var dismissAlert = _ref2.dismissAlert;
  var alerts = _ref2.alerts;
  var styles = _ref2.styles;
  var stylesError = _ref2.stylesError;
  return _react2['default'].createElement(_reactNotification.NotificationStack, {
    notifications: transformAlerts(alerts, styles, stylesError),
    onDismiss: dismissAlert
  });
};

var composer = function composer(_ref3, onData) {
  var context = _ref3.context;

  var _context2 = context();

  var Alerts = _context2.Alerts;
  var i18n = _context2.i18n;

  var alerts = Alerts.list();
  // we enforce translations-fallbacks here, because it is not a good idea
  // to show empty error message
  var fallbackOptions = {
    useFallbackForMissing: true,
    showKeyForMissing: true,
    nullKeyValue: null };
  // when a key is not given, dont show anything
  var translate = function translate(keyOrKeyArray, translateProps, disableI18n) {
    if (disableI18n) {
      return keyOrKeyArray;
    }
    return i18n.t(keyOrKeyArray, translateProps, fallbackOptions);
  };
  var translateAlert = function translateAlert(_ref4) {
    var disableI18n = _ref4.disableI18n;
    var message = _ref4.message;
    var actionLabel = _ref4.actionLabel;
    var title = _ref4.title;

    var alert = _objectWithoutProperties(_ref4, ['disableI18n', 'message', 'actionLabel', 'title']);

    return _extends({}, alert, {
      message: translate(message, alert, disableI18n),
      title: translate(title, alert, disableI18n),
      actionLabel: translate(actionLabel, alert, disableI18n)
    });
  }
  // translate alerts
  ;
  onData(null, { alerts: alerts.map(translateAlert) });
};

exports.composer = composer;
var depsMapper = function depsMapper(_context, actions) {
  return {
    context: function context() {
      return _context;
    },
    dismissAlert: actions.alerts.dismiss
  };
};

exports.depsMapper = depsMapper;
exports['default'] = (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(AlertStack);
//# sourceMappingURL=alerts_stack.js.map