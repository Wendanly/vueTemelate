

//大写带下划线转驼峰，如：REG_NAME 结果为：regName
class Hump {
  constructor(list) {
    this.list = list;
  }
  transHump() {
    let resultList = [];
    this.list.map(o => {
      let tmpObj = {};
      for (let i in o) {
        let key = this.toHump(i);
        tmpObj[key] = o[i];
      }
      resultList.push(tmpObj);
    });
    // console.log(resultList);
    return resultList;
  }
  toHump(i) {
    /**
     * 功能：大写带下划线转驼峰，如：REG_NAME 结果为：regName
     */
    let tmp = i.split('_');
    let lowcaseList = [];
    tmp.map(m => lowcaseList.push(m.toLowerCase()));
    if (lowcaseList.length > 1) {
      lowcaseList.map(n => n = n.slice(0, 1).toUpperCase() + n.slice(1));
      for (let i = 1, len = lowcaseList.length; i < len; i++) {
        lowcaseList[i] = lowcaseList[i].slice(0, 1).toUpperCase() + lowcaseList[i].slice(1)
      }
    }
    return lowcaseList.join('');
  }
}

export const transHump = list => {
  return new Hump(list).transHump();
}

export const groupByType = (arr, param) => {
  var map = {},
    dest = [];
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i];
    if (ai[param] && !map[ai[param]]) {
      dest.push({
        name: ai[param],
        data: [ai]
      });
      map[ai[param]] = ai;
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.name == ai[param]) {
          dj.data.push(ai);
          break;
        }
      }
    }
  }
  // console.log(JSON.parse(JSON.stringify(dest)));
  return dest;
}