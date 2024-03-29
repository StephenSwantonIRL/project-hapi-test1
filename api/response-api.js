import Boom from "@hapi/boom";
import {db} from "../src/models/db.js";
import _ from "lodash";

export const responseApi = {
    findByQuestion: {
        auth: false,
        handler: async function (request, h) {
            try {
                let finalResponses
                const responses = await db.responseStore.getResponsesByQuestion(request.payload.questionid);
                if (request.payload.type === "mcq") {
                finalResponses = await db.mcqResponseStore.addValuesToResponses(responses)
                } else {
                    finalResponses = responses
                }
                return finalResponses;
            } catch (err) {
                console.log(err)
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
                const responseValue = request.payload.value
                if (responseDetails.value) {
                    delete responseDetails.value
                }
                const response = await db.responseStore.addResponse(responseDetails)
                if (responseValue) {
                    await db.mcqResponseStore.addValue({value: responseValue, responseid: response.responseid})
                }
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
