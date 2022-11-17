import { message } from 'ant-design-vue';

export const result = (response, showErrMsg = true) => {
  const { data } = response;
  // 错误信息消息提示
  if (data.code === 0 && showErrMsg) {
    message.error(data.msg);
  }
  return {
    success(cb) {
      if (data.code !== 0) {
        cb(data, response);
      }
      return this;
    },
    fail(cb) {
      if (data.code === 0) {
        cb(data, response);
      }
      return this;
    },
    finally(cb) {
      cb(data, response);
      return this;
    },

  };
};

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export const formatTimeDate = (time) => {
  const date = new Date(Number(time));
  const YYYY = date.getFullYear();
  const MM = date.getMonth();
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};
