import { sql } from "./connect.js"

export const mcqPostgresStore = {

  async getOptionsById(id) {
    if (id) {
      const options = await sql` select * from mcq where questionid = ${id}`
      return options[0];
    }
    return null;
  },

  async addMCQElements(mcqElements) {
    const outcome = await sql`insert into mcq ${sql(mcqElements)}`
    const confirmAdded = await this.getOptionsById(mcqElements.questionid)
    return confirmAdded
  },


  async editMCQElements(mcqElements) {
    const outcome = await sql`update mcq set ${sql(mcqElements)} where questionid = ${mcqElements.questionid}`
    const confirmAdded = await this.getOptionsById(mcqElements.questionid)
    return confirmAdded
  },


  async deleteMCQById(id) {
    try {
      await sql`delete from mcq where questionid = ${id} returning *`
    } catch (error) {
      console.log(error) ;
    }
  },

  async deleteAllMCQ() {
    await sql`delete from mcq`
  },

  async updateMCQ(questionId, updatedMCQElements) {

    await  sql`update mcq set ${sql(updatedMCQElements)} where questionid = ${questionId} `
    const confirmUpdate = await this.getOptionsById(questionId)
    return confirmUpdate

  },

};
