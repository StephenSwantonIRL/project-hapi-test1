import { userApi } from "../api/user-api.js"
import { sessionApi } from "../api/session-api.js"
import { questionApi } from "../api/question-api.js";
import {mcqApi} from "../api/mcq-api.js";
import {openApi} from "../api/open-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/find", config: userApi.findOneByEmail },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/invite/{id}/{key}", config: userApi.checkInvite },
  { method: "POST", path: "/reset", config: userApi.forgotPassword },
  { method: "GET", path: "/reset/{id}/{key}", config: userApi.verifyLink },
  { method: "POST", path: "/reset/{id}/{key}", config: userApi.resetPassword },

  { method: "POST", path: "/api/revokeToken", config: userApi.revokeToken },
  { method: ["GET", "POST","DELETE"], path: "/api/checkToken", config: userApi.checkToken },
  { method: ["GET", "POST"], path: "/google", config: userApi.googleAuth },
  { method: ["GET", "POST"], path: "/auth", config: userApi.officeAuth },

  { method: "GET", path: "/api/sessions", config: sessionApi.find },
  { method: "POST", path: "/api/sessions", config: sessionApi.create },
  { method: "DELETE", path: "/api/sessions", config: sessionApi.deleteAll },
  { method: "GET", path: "/api/sessions/{id}", config: sessionApi.findOne },
  { method: "POST", path: "/api/sessions/find", config: sessionApi.findByUser },
  { method: "DELETE", path: "/api/sessions/{id}", config: sessionApi.deleteOne },

  { method: "GET", path: "/api/questions", config: questionApi.find },
  { method: "POST", path: "/api/questions", config: questionApi.create },

  { method: "DELETE", path: "/api/questions", config: questionApi.deleteAll },
  { method: "GET", path: "/api/questions/{id}", config: questionApi.findOne },
  { method: "POST", path: "/api/questions/{id}/edit", config: questionApi.updateOne },
  { method: "POST", path: "/api/questions/find", config: questionApi.findBySession }, //
  { method: "DELETE", path: "/api/sessions/{sessionId}/{id}", config: questionApi.deleteOne },
  { method: "POST", path: "/api/question/uploadimage", config: questionApi.uploadImage },

  { method: "POST", path: "/api/questions/mcq", config: mcqApi.create },
  { method: "DELETE", path: "/api/sessions/{sessionId}/{id}/mcq", config: mcqApi.deleteOne },
  { method: "GET", path: "/api/questions/mcq/{id}", config: mcqApi.findOne },
  { method: "POST", path: "/api/questions/mcq/{id}/edit", config: mcqApi.updateOne },

  { method: "POST", path: "/api/questions/open-ended", config: openApi.create },
  { method: "DELETE", path: "/api/sessions/{sessionId}/{id}/open-ended", config: openApi.deleteOne },
  { method: "GET", path: "/api/questions/open-ended/{id}", config: openApi.findOne },
  { method: "POST", path: "/api/questions/open-ended/{id}/edit", config: openApi.updateOne },

  { method: "POST", path: "/api/sessions/{sessionId}/shortcode/assign", config: sessionApi.assignShortCode },
];
