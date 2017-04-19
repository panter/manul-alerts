export default (obj) => {
  let props = [];
  /* eslint no-cond-assign: 0*/
  /* eslint no-param-reassign: 0*/
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while (obj = Object.getPrototypeOf(obj));

  return props;
};
