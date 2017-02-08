import React from 'react';
import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { NotificationStack as ReactNotificationStack } from 'react-notification';
import _ from 'lodash';

// some aliassing for ReactNotificationStack
const transformAlerts = (alerts, defaultStyles, stylesError) => alerts.map(
  ({ onActionClick, actionLabel, type, ...alert }) => ({
    ...{
      ...defaultStyles,
      ...(type === 'error' && stylesError),
    },
    ...alert,
    action: actionLabel,
    onClick: onActionClick,
  }),
);
const AlertStack = ({
    dismissAlert,
    alerts,
    styles,
    stylesError,
  }) => (
    <ReactNotificationStack
      notifications={transformAlerts(alerts, styles, stylesError)}
      onDismiss={dismissAlert}
    />
  );

export const composer = ({ context }, onData) => {
  const { Alerts, i18n } = context();
  const alerts = Alerts.list();
  const translateAlert = ({ i18n: shouldI18n, message, actionLabel, title, alert }) => ({
    ...alert,
    message: shouldI18n && !_.isNil(message) ? i18n.t(message) : message,
    title: shouldI18n && !_.isNil(title) ? i18n.t(title) : title,
    actionLabel: shouldI18n && !_.isNil(actionLabel) ? i18n.t(actionLabel) : actionLabel,
  })
  // translate alerts
  ;
  onData(null, { alerts: alerts.map(translateAlert) });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  dismissAlert: actions.alerts.dismiss,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
)(AlertStack);
