const fromEvent = require("graphcool-lib").fromEvent;
const bcrypt = require("bcryptjs");
const validator = require("validator");

function getGraphcoolUser(api, email) {
  return api
    .request(
      `
    query {
      User(email: "${email}") {
        id
      }
    }`
    )
    .then(userQueryResult => {
      if (userQueryResult.error) {
        return Promise.reject(userQueryResult.error);
      } else {
        return userQueryResult.User;
      }
    });
}

function createGraphcoolUser(api, email, passwordHash, firstName, lastName) {
  return api
    .request(
      `
    mutation {
      createUser(
        email: "${email}",
        password: "${passwordHash}",
        firstName: "${firstName}",
        lastName: "${lastName}"
      ) {
        id
        email
        firstName
        lastName
      }
    }`
    )
    .then(userMutationResult => userMutationResult.createUser);
}

module.exports = function(event) {
  if (!event.context.graphcool.pat) {
    console.log("Please provide a valid root token!");
    return { error: "Email Signup not configured correctly." };
  }

  const email = event.data.email;
  const password = event.data.password;
  const firstName = event.data.firstName;
  const lastName = event.data.lastName;
  const graphcool = fromEvent(event);
  const api = graphcool.api("simple/v1");
  const SALT_ROUNDS = 10;
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  if (validator.isEmail(email)) {
    return getGraphcoolUser(api, email)
      .then(graphcoolUser => {
        if (graphcoolUser === null) {
          return bcrypt
            .hash(password, salt)
            .then(hash =>
              createGraphcoolUser(api, email, hash, firstName, lastName)
            );
        } else {
          return Promise.reject("Email already in use");
        }
      })
      .then(graphcoolUser => {
        return graphcool
          .generateAuthToken(graphcoolUser.id, "User")
          .then(token => {
            return {
              data: {
                id: graphcoolUser.id,
                token,
                firstName: graphcoolUser.firstName,
                lastName: graphcoolUser.lastName,
                email: graphcoolUser.email
              }
            };
          });
      })
      .catch(error => {
        console.log(error);

        // don't expose error message to client!
        return { error: "An unexpected error occured." };
      });
  } else {
    return { error: "Not a valid email" };
  }
};
