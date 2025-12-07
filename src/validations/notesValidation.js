import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string()
      .custom(objectIdValidator, 'ObjectId Validation')
      .required()
      .messages({
        'any.invalid': 'Invalid note ID format',
        'string.base': 'noteId should be a type of text',
        'any.required': 'noteId is a required field',
      }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
      'string.base': 'title should be a type of text',
      'string.min': 'title should have a minimum length of {#limit}',
      'string.max': 'title should have a maximum length of {#limit}',
      'any.required': 'title is a required field',
    }),

    content: Joi.string().allow('').max(2000).messages({
      'string.base': 'content should be a type of text',
      'string.max': 'content should have a maximum length of {#limit}',
    }),

    tag: Joi.string().valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100),
    content: Joi.string().allow('').max(2000),
    tag: Joi.string().valid(...TAGS),
  }).or('title', 'content', 'tag'),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),

    sortBy: Joi.string()
      .valid('_id', 'title', 'tag', 'createdAt', 'updatedAt')
      .default('_id'),

    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  }),
};
