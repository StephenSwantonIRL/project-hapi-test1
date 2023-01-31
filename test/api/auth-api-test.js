import { assert } from "chai";
import { backEndService } from "./backend-service.js";
import { decodeToken } from "../../api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    backEndService.clearAuth();
    backEndService.clearAuth();
  });

  test("authenticate", async () => {
    const returnedUser = await backEndService.createUser(maggie);
    const response = await backEndService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
    await backEndService.deleteAllUsers();
  });

  test("verify Token", async () => {
    const returnedUser = await backEndService.createUser(maggie);
    const response = await backEndService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
    await backEndService.deleteAllUsers();
  });

  test("check Unauthorized", async () => {
    backEndService.clearAuth();
    try {
      await backEndService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
