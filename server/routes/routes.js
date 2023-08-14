import express from "express";

import { addEvent, getEvent } from "../controllers/events.js";
import { login, register } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/event", addEvent);
router.get("/events", getEvent);

export default router;
