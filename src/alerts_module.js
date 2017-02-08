import actions from './actions';
import AlertsService from './alerts_service';

export default {
  actions,
  load(context) {
    /* eslint no-param-reassign: 0 */
    context.Alerts = new AlertsService(context);
  },
};
