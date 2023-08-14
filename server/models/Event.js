import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  timeFrom: {
    type: String,
    required: true,
  },

  timeTo: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("events", eventSchema);

export default Event;
