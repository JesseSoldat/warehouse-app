const mongoose = require("mongoose");
const { Schema } = mongoose;

const RackSchema = new Schema(
  {
    rackLabel: { type: Number, required: true },
    storage: {
      type: Schema.Types.ObjectId,
      ref: "storage"
    },
    shelves: [
      {
        type: Schema.Types.ObjectId,
        ref: "shelf"
      }
    ]
  },
  { timestamps: true }
);

const Rack = mongoose.model("rack", RackSchema);

module.exports = Rack;
