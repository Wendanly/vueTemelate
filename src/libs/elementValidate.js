export default {
  // 小写大写字母
  alphabets: len => {
    len = len ? len : 50;
    return new RegExp("^[a-zA-Z]{0," + len + "}$");
  },
  // 正数，可包含小数（小数位自定义），或者不包含
  decimal: len => {
    // len：小数位数
    len = len ? len : 1;
    return new RegExp("^[1-9]+(.[1-9]{0," + len + "})?$");
  },
  // 非零开头的正整数，
  nonzeroInteger: len => {
    // 
    len = len ? len : 1;
    return new RegExp("^[1-9][0-9]{0," + len + "}$");
  },
  // 非零开头的正整数，
  include: len => {
    // 
    len = len ? len : 1;
    return new RegExp("^[-]?[0-9]{1," + len + "}$");
  },
  // 正整数
  integer: len => {
    len = len ? len : 6;
    return new RegExp("^[1-9]{1," + len + "}$");
  },
}
