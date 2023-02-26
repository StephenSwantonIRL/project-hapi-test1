import Boom from "@hapi/boom";
import { db } from "../src/models/db.js";

export const sessionApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sessions = await db.sessionStore.getAllSessions();
        return sessions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByUser: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sessions = await db.sessionStore.getSessionsByUser(request.payload.userid);
        return sessions;
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const session = await db.sessionStore.getSessionById(request.params.id);
        if (!session) {
          return Boom.notFound("No Session with this id");
        }
        return session;
      } catch (err) {
        return Boom.serverUnavailable("No session with this id - query failed");
      }
    },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const sessionDetails = request.payload;
        const session = await db.sessionStore.addSession(sessionDetails)
        console.log(session)
        return h.response(session).code(201);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.sessionStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.sessionStore.deleteSessionById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

};
