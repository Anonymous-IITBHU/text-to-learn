const mongoose = require('mongoose');

/**
 * Lesson — a single unit of learning content.
 *
 * `content` is a flexible array of structured blocks matching the schema:
 *   { type: "heading"|"paragraph"|"code"|"video"|"mcq", ...typeSpecificFields }
 *
 * `objectives` holds the learning goals for this lesson.
 * `isEnriched` tracks whether AI-enhanced detail generation has been applied.
 */
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    objectives: [
      {
        type: String,
        trim: true,
      },
    ],
    content: {
      type: [mongoose.Schema.Types.Mixed],
      required: [true, 'Lesson content is required'],
    },
    isEnriched: {
      type: Boolean,
      default: false,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
