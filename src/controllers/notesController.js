import { NoteModel } from "../models/note.js";
import createHttpError from "http-errors";

export const getAllNotes = async (req, res) => {
  const notes = await NoteModel.find();

  res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteModel.findById(noteId);

  if (!note) {
    return next(createHttpError(404, "Note not found"));
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await NoteModel.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOneAndDelete({ _id: noteId });
  if (!note) {
    next(createHttpError(404, "Note not found"));
    return;
  }
  res.status(200).json(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await NoteModel.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });
  if (!note) {
    next(createHttpError(404, "Note not found"));
    return;
  }
  res.status(200).json(note);
};
