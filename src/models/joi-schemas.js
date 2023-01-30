import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().min(2).pattern(new RegExp("^[a-zA-Z\u00C0-\u00FF- ]*$")).example("Homer").required(),
    lastName: Joi.string().min(2).pattern(new RegExp("^[a-zA-Z'\u00C0-\u00FF- ]*$")).example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().min(6).example("yourSecretPassword").required(),
    gitHub: Joi.string().example("Username1234").optional()
  })
  .label("UserDetails");

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");


export const UserSpecPlus = UserSpec.keys({
  isAdmin: Joi.boolean(),
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");