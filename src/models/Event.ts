import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  slug: {
    type: String,
    unique: true,
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
  category: {
    type: String,
    enum: ['Concert', 'Théâtre', 'Humour', 'Atelier', 'Autre'],
    default: 'Autre',
    required: [true, 'Please provide a category'],
  },
  subtitle: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  artistImage: {
    type: String,
  },
  artistWebsite: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  artistNote: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const Event = models.Event || model('Event', EventSchema);

export default Event;
