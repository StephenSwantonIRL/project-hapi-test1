import chai, { assert, expect } from "chai";
import * as uuid from "uuid"

import chaiAsPromised from "chai-as-promised";
import _ from "lodash";
import { db } from "../../src/models/db.js";
import {maggie, updatedMaggie, suzie, testUsers, planetSession} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

chai.use(chaiAsPromised);

suite("Session Model tests", () => {
  setup(async () => {
    db.init("postgres");
  });

  test("get all sessions", async () => {
    const returnedSessions = await db.sessionStore.getAllSessions();
    console.log(returnedSessions);
    assert.equal(returnedSessions.length, 1);
  });

  test("create a session - successful ", async () => {
    await db.userStore.deleteAll();
    await db.sessionStore.deleteAll();
    maggie.userid = uuid.v1()
    const user = await db.userStore.addUser(maggie)
    console.log(user)
    planetSession.sessionid = uuid.v1()
    planetSession.userid = user.userid
    console.log(planetSession)
    const newSession = await db.sessionStore.addSession(planetSession);
    console.log(newSession);
    assertSubset(planetSession, newSession);
  });

  test("delete all Sessions", async () => {
    let returnedSessions = await db.sessionStore.getAllSessions();
    assert.equal(returnedSessions.length, 1);
    await db.sessionStore.deleteAll();
    returnedSessions = await db.sessionStore.getAllSessions();
    assert.equal(returnedSessions.length, 0);
  });

  test("get a session - success", async () => {
    await db.userStore.deleteAll();
    maggie.userid = uuid.v1()
    const user = await db.userStore.addUser(maggie);
    planetSession.sessionid = uuid.v1()
    planetSession.userid = user.userid
    console.log(planetSession)
    const newSession = await db.sessionStore.addSession(planetSession);
    console.log(newSession);
    const retrievedSession = await db.sessionStore.getSessionById(newSession.sessionid)
    console.log(retrievedSession)
    assert.equal(retrievedSession.sessionid,newSession.sessionid)



  });

  test("delete a session by id - success", async () => {
    await db.userStore.deleteAll();
    maggie.userid = uuid.v1()
    const user = await db.userStore.addUser(maggie);
    planetSession.sessionid = uuid.v1()
    planetSession.userid = user.userid
    console.log(planetSession)
    const newSession = await db.sessionStore.addSession(planetSession);
    console.log(newSession);
    const retrievedSession = await db.sessionStore.getSessionById(newSession.sessionid)
    assert.equal(retrievedSession.sessionid, newSession.sessionid)
    await db.sessionStore.deleteSessionById(retrievedSession.sessionid)
    const retrievedSession2 = await db.sessionStore.getSessionById(retrievedSession.sessionid)
    assert.isUndefined(retrievedSession2)
  });



});
