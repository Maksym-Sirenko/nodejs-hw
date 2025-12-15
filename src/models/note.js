import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: { type: String, trim: true, required: false, default: '' },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
      required: false,
    },
    userId: {type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

notesSchema.index(
  {
    title: 'text',
    content: 'text',
  },
  {
    name: 'TextIndex',
    weights: { title: 5, content: 1 },
    default_language: 'english',
  },
);

export const Note = model('Note', notesSchema, 'notes');
