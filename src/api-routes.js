import { userApi } from "../api/user-api.js"
import { sessionApi } from "../api/session-api.js"

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

];