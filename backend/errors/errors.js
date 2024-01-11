const http2 = require('http2');

const httpStatusCodes = {
  OK: http2.constants.HTTP_STATUS_OK,
  CREATED: http2.constants.HTTP_STATUS_CREATED,
  ACCEPTED: http2.constants.HTTP_STATUS_ACCEPTED,
  NO_CONTENT: http2.constants.HTTP_STATUS_NO_CONTENT,
  BAD_REQUEST: http2.constants.HTTP_STATUS_BAD_REQUEST,
  UNAUTHORIZED: http2.constants.HTTP_STATUS_UNAUTHORIZED,
  FORBIDDEN: http2.constants.HTTP_STATUS_FORBIDDEN,
  NOT_FOUND: http2.constants.HTTP_STATUS_NOT_FOUND,
  METHOD_NOT_ALLOWED: http2.constants.HTTP_STATUS_METHOD_NOT_ALLOWED,
  CONFLICT: http2.constants.HTTP_STATUS_CONFLICT,
  INTERNAL_SERVER_ERROR: http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
};

module.exports = httpStatusCodes;
