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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

notesSchema.index({ title: 'text', content: 'text' });

export const NoteModel = model('Note', notesSchema, 'notes');
