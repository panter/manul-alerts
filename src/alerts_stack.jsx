import React from 'react';
import { useDeps, composeAll } from '@storybook/mantra-core';

import { NotificationStack as ReactNotificationStack } from 'react-notification';
import { pure } from 'recompose';
import composeWithTracker from './utils/composeWithTracker';

// some aliassing for ReactNotificationStack
const transformAlerts = (alerts, defaultStyles, stylesError) =>
  alerts.map(({ onActionClick, actionLabel, type, ...alert }) => ({
    ...{
      ...defaultStyles,
      ...(type === 'error' && stylesError),
    },
    ...alert,
    action: actionLabel,
    onClick: onActionClick,
  }));
const AlertStack = ({ dismissAlert, alerts, styles, stylesError }) => (
  <ReactNotificationStack
    notifications={transformAlerts(alerts, styles, stylesError)}
    onDismiss={dismissAlert}
  />
);

export const composer = ({ context }, onData) => {
  const { Alerts, i18n } = context();
  const alerts = Alerts.list();
  // we enforce translations-fallbacks here, because it is not a good idea
  // to show empty error message
  const fallbackOptions = {
    useFallbackForMissing: true,
    showKeyForMissing: true,
    nullKeyValue: null, // when a key is not given, dont show anything
  };
  const translate = (keyOrKeyArray, translateProps, disableI18n) => {
    if (disableI18n) {
      return keyOrKeyArray;
    }
    return i18n.t(keyOrKeyArray, translateProps, fallbackOptions);
  };
  const translateAlert = ({ disableI18n, message, actionLabel, title, ...alert }) => ({
    ...alert,
    message: translate(message, alert, disableI18n),
    title: translate(title, alert, disableI18n),
    actionLabel: translate(actionLabel, alert, disableI18n),
  });
  // translate alerts
  onData(null, { alerts: alerts.map(translateAlert) });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  dismissAlert: actions.alerts.dismiss,
});

export default composeAll(composeWithTracker(composer), useDeps(depsMapper), pure)(AlertStack);
