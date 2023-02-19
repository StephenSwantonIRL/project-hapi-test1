import _ from "lodash";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { backEndService } from "./backend-service.js";
import { maggie, testUsers, maggieCredentials, planetSession } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("Session API tests", () => {
  setup(async () => {
    db.init("postgres");
  });

  test("create a session", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)

  });
  test("delete all sessions", async () => {
    await backEndService.deleteAllSessions();
    const returnedSessions =  await backEndService.getAllSessions()
    assert.equal(returnedSessions.length, 0);
  });

  test("get a session", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)
    const returnedSession = await backEndService.getSessionById(newSession.sessionid)
    assert.equal(newSession.sessionid, returnedSession.sessionid);

  });

  test("delete a session", async () => {
    await backEndService.deleteAllUsers();
    const newUser = await backEndService.createUser(maggie);
    planetSession.userid = newUser.userid
    const newSession = await backEndService.createSession(planetSession)
    const returnedSession = await backEndService.getSessionById(newSession.sessionid)
    assert.equal(newSession.sessionid, returnedSession.sessionid);
    await backEndService.deleteSessionById(newSession.sessionid)
    const returnedSession2 = await backEndService.getSessionById(newSession.sessionid)
    assert.isUndefined(returnedSession2)
  });


});
