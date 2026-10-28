const mongoose = require('mongoose');

/**
 * Course — top-level entity created when a user generates a course from a topic prompt.
 * References an array of Module documents via ObjectId.
 */
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    creator: {
      type: String,
      required: [true, 'Creator (Auth0 sub) is required'],
      index: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
