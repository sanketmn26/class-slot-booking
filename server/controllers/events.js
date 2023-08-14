import Event from "../models/Event.js";

//  add event

export const addEvent = async (req, res) => {
  let event;
  try {
    event = new Event(req.body);
    await event.save();
  } catch (err) {
    console.log(err);
  }

  if (!event) {
    return res.status(500).json({ message: "can't create event!" });
  } else {
    return res.status(201).json(event);
  }
};

// list events

export const getEvent = async (req, res) => {
  let events;
  try {
    events = await Event.find(req.query);
  } catch (err) {
    console.log(err);
  }

  if (!events) {
    return res.status(404).json({ message: "Events not found!" });
  } else {
    return res.status(200).json(events);
  }
};
