import * as uuid from "uuid"

import { sql } from "./connect.js"

export const tokenPostgresStore = {


  async addRevokedToken(tokenToAdd) {
    try {
      tokenToAdd.id = uuid.v1()
      tokenToAdd.revoked = (new Date()).toISOString()
      const outcome = await sql`insert into Tokens ${sql(tokenToAdd)}`
      const confirmAdded = await this.checkToken(tokenToAdd.id)
      return confirmAdded
    } catch (e) {
      return new Error("Revoke Failed");
    }

  },

  async checkToken(token) {
    const tokenToCheck = await sql`select * from Tokens where token = ${token}`
    if (tokenToCheck[0]) {
      return "revoked";
    }
    return "ok";
  },
};
