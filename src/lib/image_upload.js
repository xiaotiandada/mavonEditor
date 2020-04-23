import axios from "axios";

export const uploadImage = (imgFile, url, token) => {
  let formData = new FormData();
  formData.append("file", imgFile);

  let axiosConfig = {
    url: url,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
  // header 写入 token
  if (token) {
    axiosConfig.headers[token.key] = token.value
  }
  return axios(axiosConfig);
};
