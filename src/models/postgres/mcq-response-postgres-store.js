import * as uuid from "uuid"
import { sql } from "./connect.js"
import {db} from "../db.js";
import _ from "lodash";


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
      return values;
    }
    return null;
  },


  async addValuesToResponses(responses){
    const finalResponses = []
    for (let i = 0; i < responses.length; i += 1) {
      await db.mcqResponseStore.getValuesByResponse(responses[i].responseid).then((x) => {
        responses[i].values = x
        finalResponses.push(responses[i])
      })
    }
    responses =_.clone(finalResponses)
    return responses
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
