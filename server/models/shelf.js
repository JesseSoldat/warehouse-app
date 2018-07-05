const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShelfSchema = new Schema(
  {
    shelfLabel: { type: Number, required: true },
    rack: {
      type: Schema.Types.ObjectId,
      ref: "rack"
    },
    spots: [
      {
        type: Schema.Types.ObjectId,
        ref: "shelfSpot"
      }
    ]
  },
  { timestamps: true }
);

const Shelf = mongoose.model("shelf", ShelfSchema);

module.exports = Shelf;
