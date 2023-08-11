import * as uuid from "uuid"
import { sql } from "./connect.js"


export const sessionPostgresStore = {
  async getAllSessions() {
    const sessions = await sql` select * from sessions`
    return sessions;
  },

  async getSessionById(id) {
    if (id) {
      const session = await sql` select * from sessions where sessionid = ${id}`
      return session[0];
    }
    return null;
  },

  async addSession(session) {
    session.sessionid = uuid.v1();
    const outcome = await sql`insert into sessions ${sql(session)}`
    const confirmAdded = await this.getSessionById(session.sessionid)
    return confirmAdded
  },

  async getSessionsByUser(userid) {
    if (userid) {
      const sessions = await sql` select * from sessions where userid = ${userid}`
      return sessions;
    }
    return null;
  },


  async deleteSessionById(id) {
    try {
      await sql`delete from sessions where sessionid = ${id} returning *`
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await sql`delete from sessions`
  },

  async updateSession(sessionId, updatedSession) {

    await  sql`update sessions set ${sql(updatedSession)} where sessionid = ${sessionId} `
    const confirmUpdate = await this.getSessionById(sessionId)
    return confirmUpdate

  },

  async addShortCodeById(shortcode, sessionId) {

    await  sql`update sessions set shortcode = ${shortcode} where sessionid = ${sessionId} `
    const confirmUpdate = await this.getSessionById(sessionId)
    return confirmUpdate

  },

  async addWaitMessageById(waitMessage, sessionId) {

    await  sql`update sessions set waitmessage = ${waitMessage} where sessionid = ${sessionId} `
    const confirmUpdate = await this.getSessionById(sessionId)
    return confirmUpdate

  },

  async changeStatusById(status, sessionId) {

    await  sql`update sessions set status = ${status} where sessionid = ${sessionId} `
    if(status === "inactive"){
      await  sql`update sessions set activequestion = NULL where sessionid = ${sessionId} `
      await  sql`update sessions set activequestionstarttime = NULL where sessionid = ${sessionId} `
    }

    const confirmUpdate = await this.getSessionById(sessionId)
    return confirmUpdate

  },

  async setActiveQuestion(questionid, sessionId) {

    await  sql`update sessions set activequestion = ${questionid} where sessionid = ${sessionId} `
    await  sql`update sessions set activequestionstarttime = NOW() where sessionid = ${sessionId} `
    const confirmUpdate = await this.getSessionById(sessionId)
    return confirmUpdate

  },

};
