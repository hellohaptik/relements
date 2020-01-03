import { ENDPOINTS, IMAGE_EXTENSIONS } from 'constants';
import { APIRequest, upload } from './_utils';

export const getUploadPolicy = (fileObject) => {
  const url = ENDPOINTS.BASE_URL + ENDPOINTS.POLICY_ENDPOINT;
  return APIRequest(url, 'POST', fileObject);
};

export const uploadFile = async (file, onProgress, onComplete, onError) => {
  const img = new Image();
  const extenstionRegex = /(?:\.([^.]+))?$/;
  const extension = extenstionRegex.exec(file.name)[1];

  const fileObject = {
    file_object: {
      type: file.type,
      size: file.size,
      extension: [extension, extension],
    },
  };

  if (IMAGE_EXTENSIONS.includes(extension)) {
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      fileObject.file_object.width = img.width;
      fileObject.file_object.height = img.height;
      upload(file, fileObject, onProgress, onComplete, onError);
    };
  } else {
    upload(file, fileObject, onProgress, onComplete, onError);
  }
};
