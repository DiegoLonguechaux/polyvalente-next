import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
  },
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
  },
  subject: {
    type: String,
    required: [true, "L'objet est requis"],
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
