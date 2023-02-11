import _ from "lodash";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { backEndService } from "./backend-service.js";
import { maggie, testUsers, maggieCredentials } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    db.init("postgres");
    await backEndService.deleteAllUsers();
    await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    await backEndService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await backEndService.createUser(testUsers[i]);
    }
    await backEndService.clearAuth();
  });

  test("create a user", async () => {
    const newUser = await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser.userid);
    await backEndService.deleteAllUsers();
  });
  test("delete all userApi", async () => {
    const newUser = await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    let returnedUsers = await backEndService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await backEndService.deleteAllUsers();
    await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    returnedUsers = await backEndService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
    await backEndService.deleteAllUsers();
  });

  test("get a user", async () => {
    const newUser = await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    const returnedUser = await backEndService.getUser(users[0].userid);
    assert.deepEqual(users[0], returnedUser);
    await backEndService.deleteAllUsers();
  });

  test("get a user by email", async () => {
    const newUser = await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    const returnedUser = await backEndService.getUserByEmail(users[0].email);
    assert.deepEqual(users[0], returnedUser);
    await backEndService.deleteAllUsers();
  });

  test("get a user - bad id", async () => {
    try {
      const newUser = await backEndService.createUser(maggie);
      await backEndService.authenticate(maggieCredentials);
      const returnedUser = await backEndService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
    await backEndService.deleteAllUsers();
  });

  test("get a user - deleted user", async () => {
    const newUser = await backEndService.createUser(maggie);
    await backEndService.authenticate(maggieCredentials);
    await backEndService.deleteAllUsers();
    try {
      await backEndService.createUser(maggie);
      await backEndService.authenticate(maggieCredentials);
      const returnedUser = await backEndService.getUser(testUsers[0].userid);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
    }
    await backEndService.deleteAllUsers();
  });
});
