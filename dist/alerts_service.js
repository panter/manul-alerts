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

      var options = args.length === 2 ? _lodash2['default'].first(args) : {};
      var next = _lodash2['default'].last(args);

      var _options$props = options.props;
      var props = _options$props === undefined ? function () {
        return null;
      } : _options$props;
      var _options$titleSuccess = options.titleSuccess;
      var titleSuccess = _options$titleSuccess === undefined ? function () {
        return [namespace + '.success.title', namespace + '.success', 'success.title', 'success'];
      } : _options$titleSuccess;
      var _options$titleError = options.titleError;
      var titleError = _options$titleError === undefined ? function () {
        return [namespace + '.error', 'error.title', 'error'];
      } : _options$titleError;
      var _options$messageSuccess = options.messageSuccess;
      var messageSuccess = _options$messageSuccess === undefined ? function () {
        return [namespace + '.success.message', 'success.message', null];
      } : _options$messageSuccess;
      var _options$messageError = options.messageError;
      var messageError = _options$messageError === undefined ? function (error) {
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
        if (next) {
          next(error, result);
        }
      };
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=alerts_service.js.map