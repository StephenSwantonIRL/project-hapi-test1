import * as uuid from "uuid"
import { sql } from "./connect.js"


export const anonUserPostgresStore = {
  async getAllUsers() {
    const users = await sql` select * from anon_users`
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await sql` select * from anon_users where userid = ${id}`
      return user[0];
    }
    return null;
  },

  async addUser(user) {
      user.userid = `a-${uuid.v1()}`;
      const outcome = await sql`insert into anon_users ${sql(user)}`
      const confirmAdded = await this.getUserById(user.userid)
      return confirmAdded
  },

  async deleteUserById(id) {
    try {
      await sql`delete from anon_users where userid = ${id} returning *`
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteUserBySessionId(id) {
    try {
      await sql`delete from anon_users where sessionid = ${id} returning *`
    } catch (error) {
      console.log("bad id");
    }
  },


  async deleteAll() {
    await sql`delete from anon_users`
  },


};
