import { ENDPOINTS } from "constants";

export async function APIRequest(url, method, data = undefined) {
  const request = new Request(url, {
    method: method || "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  });

  try {
    const response = await fetch(request);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await response.json();
      return Promise.resolve(json);
    }
    throw new Error("API request failed!");
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function upload(
  file,
  fileObject,
  onProgress,
  onComplete,
  onError,
) {
  const url = ENDPOINTS.BASE_URL + ENDPOINTS.POLICY_ENDPOINT;
  const policy = (await APIRequest(url, "POST", fileObject)).body;
  const fd = new FormData();
  const xhr = new XMLHttpRequest();

  Object.keys(policy.fields).map(key => {
    fd.append(key, policy.fields[key]);
  });
  fd.append("file", file);

  xhr.upload.onprogress = e => {
    if (e.lengthComputable) {
      const percentComplete = ((e.loaded / e.total) * 100).toFixed(2);
      const percentCompleteToNumber = +percentComplete;
      onProgress(percentCompleteToNumber);
    }
  };
  xhr.onload = () => {
    // Always 204 No Content
    if (xhr.status === 204) {
      let url = `${policy.url}${policy.fields.key}`;
      const { width, height } = fileObject.file_object;
      if (width && height) {
        url += `?w=${width}&h=${height}`;
      }

      const cdnUrl = url.replace(
        "haptikappimg.s3.amazonaws.com",
        "haptikappimg.haptikapi.com",
      );
      onComplete(cdnUrl);
    }
  };
  xhr.onerror = e => {
    if (onError) onError(e);
  };

  xhr.open("POST", policy.url);
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.send(fd);
}
