'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _last2 = require('lodash/last');

var _last3 = _interopRequireDefault(_last2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _first2 = require('lodash/first');

var _first3 = _interopRequireDefault(_first2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var Tracker = _ref.Tracker;

    _classCallCheck(this, _class);

    if (!Tracker) {
      throw new Error('please provide Tracker in your context');
    }
    this.confirmProps = {};
    this.alerts = [];
    this.alertsDep = new Tracker.Dependency();
    this.confirmDep = new Tracker.Dependency();
    this.counter = 0;
  }

  _createClass(_class, [{
    key: 'list',
    value: function list() {
      this.alertsDep.depend();
      return (0, _clone3.default)(this.alerts); // we provide a copy
    }
    /**
    show an alert.
     The following properties can receive simple strings or translation keys:
    - title
    - message
    - actionLabel
     If manul-i18n is in your context as i18n, the are translated.
    You can pass an array of translation keys as well. In this case
    the first key is used that exists in the current translation.
    This is usefull if you construct your key with an error code
    which might not be translated yet.
     You can add additional properties which will be available for translations
      **/

  }, {
    key: 'show',
    value: function show(_ref2) {
      var title = _ref2.title,
          message = _ref2.message,
          _ref2$dismissAfter = _ref2.dismissAfter,
          dismissAfter = _ref2$dismissAfter === undefined ? 8000 : _ref2$dismissAfter,
          onDismiss = _ref2.onDismiss,
          actionLabel = _ref2.actionLabel,
          onActionClick = _ref2.onActionClick,
          _ref2$type = _ref2.type,
          type = _ref2$type === undefined ? 'default' : _ref2$type,
          _ref2$disableI18n = _ref2.disableI18n,
          disableI18n = _ref2$disableI18n === undefined ? false : _ref2$disableI18n,
          props = _objectWithoutProperties(_ref2, ['title', 'message', 'dismissAfter', 'onDismiss', 'actionLabel', 'onActionClick', 'type', 'disableI18n']);

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
      (0, _remove3.default)(this.alerts, function (anAlert) {
        return anAlert.key === alert.key;
      });
      this.alertsDep.changed();
    }
    /**
    experimental
    **/

  }, {
    key: 'handleCallback',
    value: function handleCallback(namespace) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var options = (0, _isObject3.default)((0, _first3.default)(args)) ? (0, _first3.default)(args) : {};
      var next = (0, _isFunction3.default)((0, _last3.default)(args)) ? (0, _last3.default)(args) : _noop3.default;

      var _options$props = options.props,
          props = _options$props === undefined ? function () {
        return null;
      } : _options$props,
          _options$titleSuccess = options.titleSuccess,
          titleSuccess = _options$titleSuccess === undefined ? function () {
        return [namespace + '.success.title', namespace + '.success', 'success.title', 'success'];
      } : _options$titleSuccess,
          _options$titleError = options.titleError,
          titleError = _options$titleError === undefined ? function () {
        return [namespace + '.error', 'error.title', 'error'];
      } : _options$titleError,
          _options$messageSucce = options.messageSuccess,
          messageSuccess = _options$messageSucce === undefined ? function () {
        return [namespace + '.success.message', 'success.message', null];
      } : _options$messageSucce,
          _options$messageError = options.messageError,
          messageError = _options$messageError === undefined ? function (error) {
        return [namespace + '.error.message.' + error.error, namespace + '.error.message.default', 'error.message.' + error.error, 'error.message.default', 'error.message'];
      } : _options$messageError;

      return function (error, result) {
        var additionalProps = props({ error: error, result: result });
        if (error) {
          _this.error(_extends({
            title: titleError(),
            message: messageError(error),
            error: error,
            result: result
          }, additionalProps));
        } else {
          _this.show(_extends({
            title: titleSuccess(),
            message: messageSuccess(),
            result: result
          }, additionalProps));
        }
        next(error, result);
      };
    }
  }, {
    key: 'confirm',
    value: function confirm(_ref3) {
      var _this2 = this;

      var message = _ref3.message,
          _onConfirm = _ref3.onConfirm,
          _onCancel = _ref3.onCancel,
          props = _objectWithoutProperties(_ref3, ['message', 'onConfirm', 'onCancel']);

      var hideAndInvoke = function hideAndInvoke(callback) {
        _this2.hideConfirm();
        if (callback) {
          callback();
        }
      };
      this.confirmProps = _extends({
        message: message,
        onCancel: function onCancel() {
          return hideAndInvoke(_onCancel);
        },
        onConfirm: function onConfirm() {
          return hideAndInvoke(_onConfirm);
        }
      }, props);

      this.confirmDep.changed();
    }
  }, {
    key: 'hideConfirm',
    value: function hideConfirm() {
      this.confirmDep.changed();
      this.confirmProps = {};
    }
  }, {
    key: 'getConfirm',
    value: function getConfirm() {
      this.confirmDep.depend();
      return this.confirmProps;
    }
  }]);

  return _class;
}();

exports.default = _class;
//# sourceMappingURL=alerts_service.js.map