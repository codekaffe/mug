const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    fireDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('reminder', schema);
