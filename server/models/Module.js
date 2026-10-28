const mongoose = require('mongoose');

/**
 * Module — a distinct section within a Course, containing several Lessons.
 * Each module belongs to exactly one Course.
 */
const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Parent course reference is required'],
      index: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Module', moduleSchema);
