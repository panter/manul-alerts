'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _default = (function () {
  function _default(_ref) {
    var Tracker = _ref.Tracker;

    _classCallCheck(this, _default);

    if (!Tracker) {
      throw new Error('please provide Tracker in your context');
    }
    this.confirmCallbacks = {};
    this.alerts = [];
    this.alertsDep = new Tracker.Dependency();
    this.counter = 0;
  }

  _createClass(_default, [{
    key: 'list',
    value: function list() {
      this.alertsDep.depend();
      return _lodash2['default'].clone(this.alerts); // we provide a copy
    }
  }, {
    key: 'show',
    value: function show(_ref2) {
      var title = _ref2.title;
      var message = _ref2.message;
      var _ref2$dismissAfter = _ref2.dismissAfter;
      var dismissAfter = _ref2$dismissAfter === undefined ? 8000 : _ref2$dismissAfter;
      var onDismiss = _ref2.onDismiss;
      var actionLabel = _ref2.actionLabel;
      var onActionClick = _ref2.onActionClick;
      var _ref2$type = _ref2.type;
      var type = _ref2$type === undefined ? 'default' : _ref2$type;
      var _ref2$disableI18n = _ref2.disableI18n;
      var disableI18n = _ref2$disableI18n === undefined ? false : _ref2$disableI18n;

      var props = _objectWithoutProperties(_ref2, ['title', 'message', 'dismissAfter', 'onDismiss', 'actionLabel', 'onActionClick', 'type', 'disableI18n']);

      this.alerts.push(_extends({
        title: title,
        message: message,
        onDismiss: onDismiss,
        actionLabel: actionLabel,
        onActionClick: onActionClick,
        dismissAfter: dismissAfter,
        type: type,
        disableI18n: disableI18n
      }, props, {
        key: this.counter += 1
      }));
      this.alertsDep.changed();
    }
  }, {
    key: 'error',
    value: function error(props) {
      this.show(_extends({}, props, {
        type: 'error'
      }));
    }
  }, {
    key: 'dismiss',
    value: function dismiss(alert) {
      _lodash2['default'].remove(this.alerts, function (anAlert) {
        return anAlert.key === alert.key;
      });
      this.alertsDep.changed();
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=alerts_service.js.map