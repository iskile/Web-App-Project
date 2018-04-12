const expect = require("chai").expect;
const { omit } = require("lodash");
const config = require("../../../app/config");

const request = require("request-promise-native").defaults({
  baseUrl: "http://localhost:" + config.app.port + config.baseURI,
  resolveWithFullResponse: true
});

describe(`Get ${config.baseURI}/user`, () => {
  it("Should get the user", async () => {
    // first, add a user
    const user = {
      fname: "Bob",
      lname: "Dugla",
      email: "some@mail.com",
      password: "912379233"
    };

    const resCreate = await request.post("/user", {
      json: user
    });

    const resGet = await request.get(`/user/${resCreate.body.user.id}`, {
      auth: { bearer: resCreate.body.token },
      json: true
    });

    expect(resGet.statusCode).to.equal(200, JSON.stringify(resGet.body));
    expect(omit(resGet.body, "login")).to.eql(
      omit(resCreate.body.user, "login")
    );
  });
});
