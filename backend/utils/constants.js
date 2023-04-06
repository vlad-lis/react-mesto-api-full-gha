// error status codes
const {
  BAD_REQUEST = 400, UNAUTHORIZED = 401, FORBIDDEN = 403,
  NOT_FOUND = 404, CONFLICT = 409, INTERNAL_SERVER_ERROR = 500,
} = process.env;

// url validation regex
const urlRegex = /https?:\/\/(www.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/;

module.exports = {
  BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, INTERNAL_SERVER_ERROR, urlRegex,
};
