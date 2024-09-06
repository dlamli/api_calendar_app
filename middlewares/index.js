const fieldValidator = require("./field-validators");
const jwtValidator = require("./validate-jwt");

module.exports = {
    ...fieldValidator,
    ...jwtValidator,
};
