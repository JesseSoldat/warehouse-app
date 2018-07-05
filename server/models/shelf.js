const mongoose = require("mongoose");
const { Schema } = mongoose;

const { errRes } = require("../utils/serverResponses");

const ShelfSchema = new Schema(
  {
    shelfLabel: { type: Number, required: true },
    rack: {
      type: Schema.Types.ObjectId,
      ref: "rack"
    },
    shelfSpotLabelCounter: { type: Number, required: true },
    shelfSpots: [
      {
        type: Schema.Types.ObjectId,
        ref: "shelfSpot"
      }
    ]
  },
  { timestamps: true }
);

ShelfSchema.statics.getShelfSpotLabel = async function(shelfId) {
  const Shelf = this;
  try {
    const shelf = await Shelf.findByIdAndUpdate(
      shelfId,
      { $inc: { shelfSpotLabelCounter: 1 } },
      { new: true, upsert: true }
    );

    return Promise.resolve(shelf.shelfSpotLabelCounter);
  } catch (err) {
    return Promise.reject(
      errRes("A error occured while updating the shelf spot counter.")
    );
  }
};

const Shelf = mongoose.model("shelf", ShelfSchema);

module.exports = Shelf;
