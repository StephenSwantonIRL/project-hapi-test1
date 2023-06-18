import { sql } from "./connect.js"

export const openPostgresStore = {

  async getOptionsById(id) {
    if (id) {
      const options = await sql` select * from open_ended where questionid = ${id}`
      return options[0];
    }
    return null;
  },

  async addOpenEndedElements(openEndedElements) {
    const outcome = await sql`insert into open_ended ${sql(openEndedElements)}`
    const confirmAdded = await this.getOptionsById(openEndedElements.questionid)
    return confirmAdded
  },


  async deleteOpenEndedById(id) {
    try {
      await sql`delete from open_ended where questionid = ${id} returning *`
    } catch (error) {
      console.log(error) ;
    }
  },

  async deleteAllOpenEnded() {
    await sql`delete from open_ended`
  },

  async updateOpenEnded(questionId, updatedOpenEndedElements) {

    await  sql`update open_ended set ${sql(updatedOpenEndedElements)} where questionid = ${questionId} `
    const confirmUpdate = await this.getOptionsById(questionId)
    return confirmUpdate

  },

};
