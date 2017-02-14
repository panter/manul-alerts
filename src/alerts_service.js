import _ from 'lodash';


export default class {
  constructor({ Tracker }) {
    if (!Tracker) {
      throw new Error('please provide Tracker in your context');
    }
    this.confirmProps = {};
    this.alerts = [];
    this.alertsDep = new Tracker.Dependency();
    this.confirmDep = new Tracker.Dependency();
    this.counter = 0;
  }

  list() {
    this.alertsDep.depend();
    return _.clone(this.alerts); // we provide a copy
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
  show({

      title,
      message,
      dismissAfter = 8000,
      onDismiss,
      actionLabel,
      onActionClick,
      type = 'default',
      disableI18n = false,
      ...props
    }) {
    this.alerts.push({
      title,
      message,
      onDismiss,
      actionLabel,
      onActionClick,
      dismissAfter,
      type,
      disableI18n,
      ...props,
      key: this.counter += 1,
    });
    this.alertsDep.changed();
  }

  error(props) {
    this.show({
      ...props,
      type: 'error',
    });
  }

  dismiss(alert) {
    _.remove(this.alerts, anAlert => anAlert.key === alert.key);
    this.alertsDep.changed();
  }
  /**
  experimental
  **/
  handleCallback(namespace, ...args) {
    const options = _.isObject(_.first(args)) ? _.first(args) : {};
    const next = _.isFunction(_.last(args)) ? _.last(args) : _.noop;

    const {
        props = () => null,
        titleSuccess = () => [`${namespace}.success.title`, `${namespace}.success`, 'success.title', 'success'],
        titleError = () => [`${namespace}.error`, 'error.title', 'error'],
        messageSuccess = () => [`${namespace}.success.message`, 'success.message', null],
        messageError = error => [`${namespace}.error.message.${error.error}`, `${namespace}.error.message.default`, `error.message.${error.error}`, 'error.message.default', 'error.message'],
    } = options;
    return (error, result) => {
      const additionalProps = props({ error, result });
      if (error) {
        this.error({
          title: titleError(),
          message: messageError(error),
          error,
          result,
          ...additionalProps,
        });
      } else {
        this.show({
          title: titleSuccess(),
          message: messageSuccess(),
          result,
          ...additionalProps,
        });
      }
      next(error, result);
    };
  }

  confirm({ message, onConfirm, onCancel }) {
    const hideAndInvoke = (callback) => {
      this.hideConfirm();
      if (callback) {
        callback();
      }
    };
    this.confirmProps = {
      message,
      onCancel: () => hideAndInvoke(onCancel),
      onConfirm: () => hideAndInvoke(onConfirm),
    };

    this.confirmDep.changed();
  }
  hideConfirm() {
    this.confirmDep.changed();
    this.confirmProps = {};
  }
  getConfirm() {
    this.confirmDep.depend();
    return this.confirmProps;
  }

}
