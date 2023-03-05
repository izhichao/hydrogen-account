const deepClone = (obj: any) => {
  // 简单数据类型直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  // 根据类型定义结果是数组还是对象
  let result: any;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }

  // 拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
};

export default deepClone;
