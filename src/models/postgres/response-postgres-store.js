import * as uuid from "uuid"
import { sql } from "./connect.js"


export const responsePostgresStore = {

  async getResponseById(id) {
    if (id) {
      const response = await sql` select * from responses where responseid = ${id}`
      return response[0];
    }
    return null;
  },

  async addResponse(response) {
    response.responseid = uuid.v1();
    const outcome = await sql`insert into responses ${sql(response)}`
    const confirmAdded = await this.getResponseById(response.responseid)
    return confirmAdded
  },


  async getResponsesByQuestion(questionid) {
    if (questionid) {
      const responses = await sql` select * from responses where questionid = ${questionid}`
      return responses;
    }
    return null;
  },


  async deleteResponsesByQuestion(id) {
    try {
      await sql`delete from responses where questionid = ${id} returning *`
    } catch (error) {
      console.log(error) ;
    }
  },

  async deleteAll() {
    await sql`delete from responses`
  },

};
