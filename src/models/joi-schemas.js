import Joi from "joi";

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

export const UserSpec = Joi.object()
  .keys({
    firstname: Joi.string().min(2).pattern(new RegExp("^[a-zA-Z\u00C0-\u00FF- ]*$")).example("Homer").required(),
    lastname: Joi.string().min(2).pattern(new RegExp("^[a-zA-Z'\u00C0-\u00FF- ]*$")).example("Simpson").required(),
    email: Joi.string().email().example("stephenswanton@gmail.com").required(),
    password: Joi.string().min(6).example("yourSecretPassword").required(),
  })
  .label("UserDetails");

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");


export const UserSpecPlus = UserSpec.keys({
    userid: IdSpec,
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