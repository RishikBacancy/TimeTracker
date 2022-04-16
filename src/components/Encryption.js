import utf8 from 'utf8';
import base64 from 'base-64';

const preText = '_/tta_';

export const encryptionData = (id, data) => {
  if (data && typeof data === 'string') {
    //console.log("=====================");
    const newData = data + id;
    //console.log("saltadd = "+newData);
    const utf8Data = utf8.encode(newData);
    //console.log("utf8add = "+utf8Data);
    const encodeData = base64.encode(utf8Data);
    //console.log("base64add = "+encodeData);
    return preText + id + encodeData;
  }
  return data;
};

export const decryptionData = (id, data) => {
  if (data && typeof data === 'string' && data.startsWith(preText) === true) {
    //console.log("=====================");
    const newData = data.replace(preText, '');
    const strongEncryptedData = newData.replace(id, '');
    //console.log("saltRemove = "+newData);
    const utf8Data = base64.decode(strongEncryptedData);
    //console.log("base64Remove = "+utf8Data);
    const decodeData = utf8.decode(utf8Data);
    //console.log("utf8Remove = "+decodeData);
    return decodeData.replace(id, '');
  }
  return data;
};
