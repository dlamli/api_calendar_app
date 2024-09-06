const { response } = require("express");
const Event = require("../models/Event");

const getEvent = async (req, res = response) => {
    try {
        const events = await Event.find().populate("user", "name email");

        res.json({
            ok: true,
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact administration for managament",
        });
    }
};

const postCreateEvent = async (req, res = response) => {
    const { title } = req.body;

    try {
        let titleDuplicate = await Event.findOne({ title });

        if (titleDuplicate) {
            return res.status(404).json({
                ok: false,
                msg: "Event already exists",
            });
        }

        const event = new Event(req.body);
        event.user = req.uid;

        const eventSaved = await event.save();

        res.json({
            ok: true,
            event: eventSaved,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact administration for managament",
        });
    }
};

const putUpdateEventById = async (req, res = response) => {
    try {
        const eventId = req.params.id;
        const uid = req.uid;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found by this ID",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User not have permission to edit this event",
            });
        }

        const newEvent = { ...req.body, user: uid };
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        res.status(200).json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact administration for managament",
        });
    }
};

const deleteEvent = async (req, res = response) => {
    try {
        const eventId = req.params.id;
        const uid = req.uid;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found by this ID",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User not have permission to delete this event",
            });
        }

        const newEvent = { ...req.body, user: uid };
        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: "Event deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact administration for managament",
        });
    }
};

module.exports = {
    getEvent,
    postCreateEvent,
    putUpdateEventById,
    deleteEvent,
};
