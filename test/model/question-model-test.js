import chai, { assert, expect } from "chai";
import * as uuid from "uuid"

import chaiAsPromised from "chai-as-promised";
import _ from "lodash";
import { db } from "../../src/models/db.js";
import {
  maggie,
  updatedMaggie,
  suzie,
  testUsers,
  planetSession,
  questionCore,
  planetSessionStubForQuestion
} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

chai.use(chaiAsPromised);

suite("Question Model tests", () => {
  setup(async () => {
    db.init("postgres");
    await db.userStore.deleteAll();
    await db.sessionStore.deleteAll();
    maggie.userid = uuid.v1()
    const user = await db.userStore.addUser(maggie)
    planetSessionStubForQuestion.userid = user.userid

  });



  test("create a question - successful ", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    console.log(newQuestion);
    assertSubset(questionCore, newQuestion);
  });

  test("get all questions", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    const returnedQuestions = await db.questionStore.getAllQuestions();
    console.log(returnedQuestions);
    assert.equal(returnedQuestions.length, 1);
  });

  test("delete all Questions", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    const returnedQuestions = await db.questionStore.getAllQuestions();
    assert.equal(returnedQuestions.length, 1);
    await db.questionStore.deleteAll();
    const returnedQuestions2 = await db.questionStore.getAllQuestions();
    assert.equal(returnedQuestions2.length, 0);
  });

  test("get questions by Session Id - success", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    const retrievedQuestion = await db.questionStore.getQuestionsBySession(newQuestion.sessionid)
    assert.equal(retrievedQuestion[0].sessionid,newQuestion.sessionid)

  });

  test("get a question by Id - success", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    console.log(newQuestion);
    const idToSearch = questionCore.sessionId;
    const retrievedQuestion = await db.questionStore.getQuestionById(newQuestion.questionid)
    assert.equal(retrievedQuestion.questionid,newQuestion.questionid)

  });


  test("delete a question by id - success", async () => {
    await db.questionStore.deleteAll();
    const newSession = await db.sessionStore.addSession(planetSessionStubForQuestion);
    questionCore.sessionid = newSession.sessionid
    const newQuestion = await db.questionStore.addQuestion(questionCore);
    const retrievedQuestion = await db.questionStore.getQuestionById(newQuestion.questionid)
    assert.equal(retrievedQuestion.questionid, newQuestion.questionid)
    await db.questionStore.deleteQuestionById(retrievedQuestion.questionid)
    const retrievedQuestion2 = await db.questionStore.getQuestionById(retrievedQuestion.questionid)
    assert.isUndefined(retrievedQuestion2)
  });

});
