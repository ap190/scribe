const fetch = require("isomorphic-fetch");
const FormData = require("form-data");

// 2. Mailgun data
const token = new Buffer(`api:key-711c2b72212c7cc46ce19758a8fe182e`).toString(
  "base64"
);
const url = "https://api.mailgun.net/v3/mindflowai.com/messages";

module.exports = event => {
  const { name, email } = event.data.User.node;

  const form = new FormData();
  form.append("from", "Omer <mindflow.ai@gmail.com>");
  form.append("to", `${name} <${email}>`);
  form.append("subject", "Hello from mindflow.ai");
  form.append("text", `Welcome ${name}!`);

  return fetch(url, {
    headers: {
      Authorization: `Basic ${token}`
    },
    method: "POST",
    body: form
  });
};
