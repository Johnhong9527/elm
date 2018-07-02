function padLeftZero(str) {
  return `${str}`.substr(str.length);
}
export default function formatDate(date, fmt) {
  let fmtStr;
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  if (/(y+)/.test(fmt)) {
    fmtStr = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  Object.keys(o).forEach((key) => {
    if (new RegExp(`(${key})`).test(fmtStr)) {
      let str = o[key];
      fmtStr = fmtStr.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  });
  return fmtStr;
}
