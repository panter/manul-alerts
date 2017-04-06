import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import { pure } from 'recompose';

export const composer = ({ context }, onData) => {
  const { Alerts } = context();
  const confirmProps = Alerts.getConfirm();
  onData(null, confirmProps);
};

export const depsMapper = context => ({
  context: () => context,
});

export default C => composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
  pure,
)(C);
