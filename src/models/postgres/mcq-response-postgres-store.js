import * as uuid from "uuid"
import { sql } from "./connect.js"


export const mcqResponsePostgresStore = {

  async addValue(response) {
    response.valueid = uuid.v1();
    const outcome = await sql`insert into responsevalues ${sql(response)}`
    const confirmAdded = await this.getValueById(outcome.valueid)
    return confirmAdded
  },


  async getValuesByResponse(responseid) {
    if (responseid) {
      const values = await sql` select * from responsevalues where responseid = ${responseid}`
      return responses;
    }
    return null;
  },


  async getValueById(valueid) {
    if (valueid) {
      const values = await sql` select * from responsevalues where responseid = ${valueid}`
      return values[0];
    }
    return null;
  },


  async deleteValuesByResponse(id) {
    try {
      await sql`delete from responsevalues where responseid = ${id} returning *`
    } catch (error) {
      console.log(error) ;
    }
  },

  async deleteAll() {
    await sql`delete from responsevalues`
  },

};
