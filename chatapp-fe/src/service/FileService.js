import axios from "../utils/axios";

export async function uploadFileApi(img) {
  const form = new FormData();

  form.append("file", img);

  return axios.post("/files", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}


export async function uploadAvatarApi(img) {
  const form = new FormData();

  form.append("file", img);

  return axios.post("/files/avatar", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
