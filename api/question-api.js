import Boom from "@hapi/boom";
import { db } from "../src/models/db.js";

export const questionApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const questions = await db.questionStore.getAllQuestions();
        return questions;
      } catch (err) {
        return Boom.serverUnavailable(`Database Error ${err}`);
      }
    },
  },

  findBySession: {
    auth: false,
    handler: async function (request, h) {
      try {
        const questions = await db.questionStore.getQuestionsBySession(request.payload.userid);
        return questions;
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const question = await db.questionStore.getQuestionById(request.params.id);
        if (!question) {
          return Boom.notFound("No Question with this id");
        }
        return question;
      } catch (err) {
        return Boom.serverUnavailable(`No question with this id - query failed ${err}`);
      }
    },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const questionDetails = request.payload;
        const question = await db.questionStore.addQuestion(questionDetails)
        console.log(question)
        return h.response(question).code(201);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.questionStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(`Database Error ${err}`);
      }
    },
  },


  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.questionStore.deleteQuestionById(request.params.id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(`Database Error ${err}`);
      }
    },
  },

};
