import Boom from "@hapi/boom";
import OpenAI from "openai";

const openaiConnection = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
})

function generateCreatePrompt(responses) {
    return `Based on the following response list,  consider frequency and importance of the response content and create a json response listing word cloud values and their associated weightings, PROVIDE JSON ONLY do not include any other data or explanatory text in the response. Keep each value short. RESPONSES: ${responses}`;
}

function updatePrompt(response, previousWeights, numberOfResponses) {
    return `Given the following themes and weightings update the list to accommodate the following new response. The original list was derived from ${numberOfResponses} initial responses:   ORIGINAL THEME WEIGHTING LIST: Word Cloud Weightings:
${previousWeights}

NEW RESPONSE:   ${response}
`
}

export const wordCloudApi = {

    generateCloudData: {
        auth: false,
        handler: async function (request, h) {

            const {responses} = request.payload

            const completion = await openaiConnection.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": generateCreatePrompt(responses)}],
            });
            return completion.choices[0].message.content;
        },
    },

    updateCloudData: {
        auth: false,
        handler: async function (request, h) {

            const {weightings, response, numberOfResponses} = request.payload

            const completion = await openaiConnection.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": updatePrompt(response, weightings, numberOfResponses)}],
            });
            return completion.choices[0].message.content;
        },
    },


}
