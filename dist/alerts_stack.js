'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mantraCore = require('mantra-core');

var _reactNotification = require('react-notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// some aliassing for ReactNotificationStack
var transformAlerts = function transformAlerts(alerts, defaultStyles, stylesError) {
  return alerts.map(function (_ref) {
    var onActionClick = _ref.onActionClick,
        actionLabel = _ref.actionLabel,
        type = _ref.type,
        alert = (0, _objectWithoutProperties3.default)(_ref, ['onActionClick', 'actionLabel', 'type']);
    return (0, _extends3.default)((0, _extends3.default)({}, defaultStyles, type === 'error' && stylesError), alert, {
      action: actionLabel,
      onClick: onActionClick
    });
  });
};
var AlertStack = function AlertStack(_ref2) {
  var dismissAlert = _ref2.dismissAlert,
      alerts = _ref2.alerts,
      styles = _ref2.styles,
      stylesError = _ref2.stylesError;
  return _react2.default.createElement(_reactNotification.NotificationStack, {
    notifications: transformAlerts(alerts, styles, stylesError),
    onDismiss: dismissAlert
  });
};

var composer = function composer(_ref3, onData) {
  var context = _ref3.context;

  var _context = context(),
      Alerts = _context.Alerts,
      i18n = _context.i18n;

  var alerts = Alerts.list();
  // we enforce translations-fallbacks here, because it is not a good idea
  // to show empty error message
  var fallbackOptions = {
    useFallbackForMissing: true,
    showKeyForMissing: true,
    nullKeyValue: null };
  var translate = function translate(keyOrKeyArray, translateProps, disableI18n) {
    if (disableI18n) {
      return keyOrKeyArray;
    }
    return i18n.t(keyOrKeyArray, translateProps, fallbackOptions);
  };
  var translateAlert = function translateAlert(_ref4) {
    var disableI18n = _ref4.disableI18n,
        message = _ref4.message,
        actionLabel = _ref4.actionLabel,
        title = _ref4.title,
        alert = (0, _objectWithoutProperties3.default)(_ref4, ['disableI18n', 'message', 'actionLabel', 'title']);
    return (0, _extends3.default)({}, alert, {
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
var depsMapper = exports.depsMapper = function depsMapper(_context2, actions) {
  return {
    context: function context() {
      return _context2;
    },
    dismissAlert: actions.alerts.dismiss
  };
};

exports.default = (0, _mantraCore.composeAll)((0, _mantraCore.composeWithTracker)(composer), (0, _mantraCore.useDeps)(depsMapper))(AlertStack);
//# sourceMappingURL=alerts_stack.js.map