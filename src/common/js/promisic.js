const promisic = function (func) {
  return function (url,option = {}) {
    return new Promise((resolve, reject) => {
      func(url, option, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      });
    });
  };
};

export {
  promisic
};
