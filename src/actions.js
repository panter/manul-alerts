export default {
  alerts: {
    dismiss({ Alerts }, alert) {
      Alerts.dismiss(alert);
    },

    show({ Alerts }, alert) {
      Alerts.show(alert);
    },
  },
};
