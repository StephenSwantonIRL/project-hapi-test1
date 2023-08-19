import Boom from "@hapi/boom";
import { db } from "../src/models/db.js";

export const anonUserApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const users = await db.anonUserStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await db.anonUserStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a User by ID",
    notes: "Returns details of a single user identified by their ID number",
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const userDetails = request.payload;
        const user = await db.anonUserStore.addUser(userDetails);
        return h.response(user).code(201);
      } catch (err) {
        return Boom.serverUnavailable(err);
      }
    },
    tags: ["api"],
    description: "Create a new User",
    notes: "Adds a new user to the database.",
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.anonUserStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Deletes all users",
    notes: "Deletes all users from the database.",
  },

};
