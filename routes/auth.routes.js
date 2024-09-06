/*
    AUTH ROUTES
    HOST + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
    postCreateUser,
    postLoginUser,
    getValidateToken,
} = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
    "/new",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password is must be 6 characters").isLength({
            min: 6,
        }),
        validateFields,
    ],
    postCreateUser
);

router.post(
    "/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is must be 6 characters").isLength({
            min: 6,
        }),
        validateFields,
    ],
    postLoginUser
);

router.get("/renew", validateJWT, getValidateToken);

module.exports = router;
