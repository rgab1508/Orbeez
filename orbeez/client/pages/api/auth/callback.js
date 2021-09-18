var axios = require("axios");

export default async function handler(req, res) {
  if (req.method != "GET" || !req.query.code) {
    res.end();
    return;
  }
  const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDS);
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  const ACCESS_TOKEN_URL =
    "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";
  try {
    var access_token = await axios({
      url: CREDENTIALS.web["token_uri"],
      method: "POST",
      data: {
        client_id: CREDENTIALS.web["client_id"],
        client_secret: CREDENTIALS.web["client_secret"],
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: CREDENTIALS.web["redirect_uris"][0],
      },
    });
    var user = await axios({
      url: ACCESS_TOKEN_URL + access_token.data.access_token
    });
    res.json(user.data);
  } catch (e) {
    res.end();
  }
}
