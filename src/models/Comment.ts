import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  author: {
    type: String,
    required: [true, 'Le nom est requis'],
  },
  content: {
    type: String,
    required: [true, 'Le commentaire est requis'],
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
