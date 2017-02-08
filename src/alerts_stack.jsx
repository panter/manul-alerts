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
  // we enforce translations here,
  const i18nOptions = {
    useFallbackForMissing: true,
    showKeyForMissing: true,
  };
  const translate = (key, translateProps, disableI18n) => (
    !disableI18n && !_.isNil(key) ? i18n.t(key, translateProps, i18nOptions) : key
  );
  const translateAlert = ({ disableI18n, message, actionLabel, title, ...alert }) => ({
    ...alert,
    message: translate(message, alert, disableI18n),
    title: translate(title, alert, disableI18n),
    actionLabel: translate(actionLabel, alert, disableI18n),
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
