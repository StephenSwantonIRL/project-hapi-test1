import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import Bell from "@hapi/bell";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { validate } from "../api/jwt-utils.js";
import { fileURLToPath } from "url";
import { apiRoutes } from "./api-routes.js"
import { db } from "./models/db.js";
import HapiSwagger from "hapi-swagger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  //process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "API",
    version: "0.1",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};


async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true }
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(Bell)
  await server.register(jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  const bellAuthOptions = {
    provider: "google",
    password: process.env.cookie_password,
    clientId: process.env.googleclientid,
    clientSecret: process.env.googleclientsecret,
    location: process.env.domain,
    isSecure: false
  };
  server.auth.strategy("google-oauth", "bell", bellAuthOptions);
  
  
  
  const officeAuthOptions = {
    provider: "azure",
    password: process.env.cookie_password,
    clientId: process.env.officeclientid,
    clientSecret: process.env.officeclientsecret,
    config: {
          tenant: "1161d13f-25a2-4d2e-93a2-782643d1f32f",
    },
    location: process.env.domain,
    isSecure: false,
    providerParams: {
            response_type: "code"
        },
        scope: ["openid", "offline_access", "user.read"]
  };
  server.auth.strategy("office-oauth", "bell", officeAuthOptions);
  
  

  server.auth.default("jwt");

  db.init("postgres");
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
