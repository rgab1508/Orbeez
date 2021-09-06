export default function handler(req, res) {
  if (req.method != "GET") {
    res.end();
    return;
  }
  const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDS);
  const scope = "https://www.googleapis.com/auth/userinfo.email";
  res
    .status(307)
    .redirect(
      CREDENTIALS.web["auth_uri"] +
        "?scope=" +
        scope +
        "&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=" +
        CREDENTIALS.web["redirect_uris"][0] +
        "&response_type=code&client_id=" +
        CREDENTIALS.web["client_id"]
    );
}