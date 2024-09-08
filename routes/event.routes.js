/*
    AUTH ROUTES
    HOST + /api/event
*/
const { Router } = require("express");
const { check } = require("express-validator");

const {
    getEvent,
    postCreateEvent,
    putUpdateEventById,
    deleteEvent,
} = require("../controllers/event.controller");
const { validateJWT, validateFields } = require("../middlewares");
const { isDate, checkEndDate } = require("../helpers");

const router = Router();

// Get events
router.use(validateJWT);

router.get("/", getEvent);

router.post(
    "/",
    [
        check("title", "Event title is required").not().isEmpty(),
        check("start", "Start Date is required").custom(isDate),
        check("end", "End Date is required").custom(isDate),
        check("end", "End Date must be highter than Start Date").custom(
            checkEndDate
        ),
        validateFields,
    ],
    postCreateEvent
);

router.put(
    "/:id",
    [
        check("title", "Event title is required").not().isEmpty(),
        check("start", "Start Date is required").custom(isDate),
        check("end", "End Date is required").custom(isDate),
        validateFields,
    ],
    putUpdateEventById
);

router.delete("/:id", deleteEvent);

module.exports = router;
