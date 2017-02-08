import _ from 'lodash';


export default class {
  constructor({ Tracker }) {
    if (!Tracker) {
      throw new Error('please provide Tracker in your context');
    }
    this.confirmCallbacks = {};
    this.alerts = [];
    this.alertsDep = new Tracker.Dependency();
    this.counter = 0;
  }

  list() {
    this.alertsDep.depend();
    return _.clone(this.alerts); // we provide a copy
  }
  show({ title, message, dismissAfter = 8000, onDismiss, actionLabel, onActionClick, type = 'default', disableI18n = false }) {
    this.alerts.push({
      title,
      message,
      onDismiss,
      actionLabel,
      onActionClick,
      dismissAfter,
      type,
      disableI18n,
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

}
