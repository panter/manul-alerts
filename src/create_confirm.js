import {
  useDeps,
  composeAll,
} from '@storybook/mantra-core';
import { pure } from 'recompose';
import composeWithTracker from './utils/compose_with_tracker';

export const composer = ({ context }, onData) => {
  const { Alerts } = context();
  const confirmProps = Alerts.getConfirm();
  onData(null, confirmProps);
};

export const depsMapper = context => ({
  context: () => context,
});

export default C =>
  composeAll(composeWithTracker(composer), useDeps(depsMapper), pure)(C);
