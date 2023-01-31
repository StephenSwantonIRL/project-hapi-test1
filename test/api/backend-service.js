import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const backEndService = {
  backEndUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.backEndUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.backEndUrl}/api/users/${id}`);
    return res.data;
  },

  async getUserByEmail(email) {
    const res = await axios.post(`${this.backEndUrl}/api/users/find`, {email: email});
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.backEndUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.backEndUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.backEndUrl}/api/users/authenticate`, user);
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common["Authorization"] = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common["Authorization"] = "";
  },
};
