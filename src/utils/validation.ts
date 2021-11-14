/* eslint-disable import/prefer-default-export */
const r : RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

export const isUrlValid = (url : string) : boolean => r.test(url);
