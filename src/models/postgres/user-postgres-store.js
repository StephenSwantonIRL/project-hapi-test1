import * as uuid from "uuid"
import { sql } from "./connect.js"


export const userPostgresStore = {
  async getAllUsers() {
    const users = await sql` select * from users`
    return users[0] ? users : null;
  },

  async getUserById(id) {
    if (id) {
      const user = await sql` select * from users where userId = ${id}`
      return user[0];
    }
    return null;
  },

  async addUser(user) {
    const userInDb = await this.getUserByEmail(user.email);
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      return new Error("Incomplete User Information");
    }
    if (userInDb === null) {
      user.isadmin = false;
      user.ispresenter = false;
      user.sso = "false";
      user.organisation = "";
      user.role = ""
      user.profilephoto = "";
      user.userid = uuid.v1();

      const outcome = await sql`insert into Users ${sql(user)}`
      const confirmAdded = await this.getUserById(user.userid)
      return confirmAdded

    }
      return new Error("User Already Exists");

  },

  async getUserByEmail(email) {
    if (email) {
      const user = await sql` select * from users where email = ${email}`
      return user[0] ? user[0] : null;
    }
    return null;
  },

  async getUserByGitHub(id) {
    // const user =
    // return user;
  },

  async deleteUserById(id) {
    try {
      await sql`delete from users where userid = ${id} returning *`
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await sql`delete from users`
  },

  async updateUser(userId, updatedUser) {
    const user = await this.getUserById(userId);
    const emailCheck = await this.getUserByEmail(updatedUser.email);
    if (user !== null && (emailCheck === null || user.email === updatedUser.email)) {
     // update query
      return null
    }
    if (emailCheck !== null) {
      return Promise.reject(Error("Another user is already using that email address"));
    }

      return Promise.reject(Error("User does not exist"));
  },

  async checkAdmin(id) {
    if (id) {
      const user = await sql` select * from users where userId = ${id}`
      return user[0] ? user.isAdmin : false;
    }
    return null;
  },

  async makeAdmin(id) {
    if (id) {
      // update isAdmin query
      // const outcome = await this.getUserById(id)
      // return outcome.isAdmin
    }
    return Promise.reject(Error("User does not exist"));
  },

  async revokeAdmin(id) {
    if (id) {
      // update isAdmin query
      // const outcome = await this.getUserById(id)
      // return outcome.isAdmin
    }
    return Promise.reject(Error("User does not exist"));
  },
};
