import { useDeps, composeAll, composeWithTracker } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Alerts } = context();
  const { message, onCancel, onConfirm } = Alerts.getConfirm();
  onData(null, { message, onCancel, onConfirm });
};

export const depsMapper = context => ({
  context: () => context,
});

export default C => composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
)(C);
