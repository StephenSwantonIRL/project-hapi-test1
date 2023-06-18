import Boom from "@hapi/boom";
import { db } from "../src/models/db.js";
import { imageStore } from "../src/models/image-store.js"

export const mcqApi = {

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const question = await db.mcqStore.getOptionsById(request.payload.questionid);
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
        const question = await db.mcqStore.addMCQElements(questionDetails)
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
