"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (obj) {
  var props = [];
  /* eslint no-cond-assign: 0*/
  /* eslint no-param-reassign: 0*/
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while (obj = Object.getPrototypeOf(obj));

  return props;
};
//# sourceMappingURL=get_all_properties.js.map