import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  images: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Event = models.Event || model('Event', EventSchema);

export default Event;
