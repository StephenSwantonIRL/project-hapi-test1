import _ from "lodash";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { backEndService } from "./backend-service.js";
import { maggie, testUsers, maggieCredentials, planetSession, questionCore } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("Question API tests", () => {
  setup(async () => {
    db.init("postgres");
  });

  test("create a question", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await backEndService.createQuestion(questionCore)
    console.log(newQuestion)
    assertSubset(questionCore, newQuestion)
  });




  test("get a question", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await backEndService.createQuestion(questionCore)
    const returnedQuestion = await backEndService.getQuestionById(newQuestion.questionid)
    assert.equal(newQuestion.questionid, returnedQuestion.questionid);

  });

  test("delete a question", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await backEndService.createQuestion(questionCore)
    const returnedQuestion = await backEndService.getQuestionById(newQuestion.questionid)
    assert.equal(newQuestion.questionid, returnedQuestion.questionid);
    await backEndService.deleteQuestionById("1234567", newQuestion.questionid)
    const returnedQuestion2 = await backEndService.getQuestionById(newQuestion.questionid)
    assert.isUndefined(returnedQuestion2)
  });


});
