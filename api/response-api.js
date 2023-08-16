import Boom from "@hapi/boom";
import { db } from "../src/models/db.js";
import { imageStore } from "../src/models/image-store.js"

export const responseApi = {
  findByQuestion: {
    auth: false,
    handler: async function (request, h) {
      try {
        const responses = await db.responseStore.getResponsesByQuestion(request.payload);
        return responses;
      } catch (err) {
        return Boom.serverUnavailable(`Database Error ${err}`);
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const response = await db.responseStore.getResponseById(request.params.id);
        if (!response) {
          return Boom.notFound("No Response with this id");
        }
        return response;
      } catch (err) {
        return Boom.serverUnavailable(`No response with this id - query failed ${err}`);
      }
    },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const responseDetails = request.payload;
        console.log(responseDetails)
        if(responseDetails.value){
          delete responseDetails.value
        }
        console.log(responseDetails)
        const response = await db.responseStore.addResponse(responseDetails)
        return h.response(response).code(201);
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


  deleteResponsesByQuestion: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.questionStore.deleteResponsesByQuestion(request.params.questionid);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable(`Database Error ${err}`);
      }
    },
  },


};
