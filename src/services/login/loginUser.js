import api from "../api";
export async function loginUser(username, password) {
  try {
    const { data } = await api.post("auth/login", {
      username: username,
      password: password,
    });

    return data;
  } catch (error) {
    const msg =
      error.response?.data?.detail ||
      "Something went wrong. Please try again.";
    throw new Error(msg);
  }
}
