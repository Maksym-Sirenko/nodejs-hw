import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const noteRouter = Router();

noteRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
noteRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
noteRouter.post('/notes', celebrate(createNoteSchema), createNote);
noteRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
noteRouter.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default noteRouter;
