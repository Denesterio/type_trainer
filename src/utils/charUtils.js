const isCharInLowerCase =  (code) => (code >= 97 && code <= 122);

const isCharInUpperCase = (code) => (code >= 65 && code <= 90);

const isCharNumber = (code) => (code >= 48 && code <= 57);

export {
  isCharInLowerCase,
  isCharInUpperCase,
  isCharNumber,
};