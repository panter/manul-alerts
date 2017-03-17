'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
  function _class(_ref) {
    var Tracker = _ref.Tracker;
    (0, _classCallCheck3.default)(this, _class);

    if (!Tracker) {
      throw new Error('please provide Tracker in your context');
    }
    this.confirmProps = {};
    this.alerts = [];
    this.alertsDep = new Tracker.Dependency();
    this.confirmDep = new Tracker.Dependency();
    this.counter = 0;
  }

  (0, _createClass3.default)(_class, [{
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
          props = (0, _objectWithoutProperties3.default)(_ref2, ['title', 'message', 'dismissAfter', 'onDismiss', 'actionLabel', 'onActionClick', 'type', 'disableI18n']);

      this.alerts.push((0, _extends3.default)({
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
      this.show((0, _extends3.default)({}, props, {
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
          _this.error((0, _extends3.default)({
            title: titleError(),
            message: messageError(error),
            error: error,
            result: result
          }, additionalProps));
        } else {
          _this.show((0, _extends3.default)({
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
          props = (0, _objectWithoutProperties3.default)(_ref3, ['message', 'onConfirm', 'onCancel']);

      var hideAndInvoke = function hideAndInvoke(callback) {
        _this2.hideConfirm();
        if (callback) {
          callback();
        }
      };
      this.confirmProps = (0, _extends3.default)({
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