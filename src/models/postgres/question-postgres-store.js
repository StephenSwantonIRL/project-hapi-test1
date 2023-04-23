import * as uuid from "uuid"
import { sql } from "./connect.js"


export const questionPostgresStore = {
  async getAllQuestions() {
    const questions = await sql` select * from questions`
    return questions;
  },

  async getQuestionById(id) {
    if (id) {
      const question = await sql` select * from questions where questionid = ${id}`
      return question[0];
    }
    return null;
  },

  async addQuestion(question) {
    question.questionid = uuid.v1();
    const outcome = await sql`insert into questions ${sql(question)}`
    const confirmAdded = await this.getQuestionById(question.questionid)
    return confirmAdded
  },

  async getQuestionsBySession(sessionid) {
    if (sessionid) {
      const questions = await sql` select * from questions where sessionid = ${sessionid}`
      return questions;
    }
    return null;
  },


  async deleteQuestionById(id) {
    try {
      await sql`delete from questions where questionid = ${id} returning *`
    } catch (error) {
      console.log(error) ;
    }
  },

  async deleteAll() {
    await sql`delete from questions`
  },

  async updateQuestion(questionId, updatedQuestion) {

    await  sql`update questions set ${sql(updatedQuestion)} where questionid = ${quesionId} `
    const confirmUpdate = await this.getQuestionById(questionId)
    return confirmUpdate

  },

};
