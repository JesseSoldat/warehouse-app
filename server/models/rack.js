const mongoose = require("mongoose");
const { Schema } = mongoose;

const { errRes } = require("../utils/serverResponses");

const RackSchema = new Schema(
  {
    rackLabel: { type: Number, required: true },
    storage: {
      type: Schema.Types.ObjectId,
      ref: "storage"
    },
    shelfLabelCounter: { type: Number, required: true },
    shelves: [
      {
        type: Schema.Types.ObjectId,
        ref: "shelf"
      }
    ]
  },
  { timestamps: true }
);

RackSchema.statics.getShelfLabel = async function(rackId) {
  const Rack = this;
  try {
    const rack = await Rack.findByIdAndUpdate(
      rackId,
      { $inc: { shelfLabelCounter: 1 } },
      { new: true, upsert: true }
    );
    return Promise.resolve(rack.shelfLabelCounter);
  } catch (err) {
    return Promise.reject(
      errRes("An error occured while creating the shelf label")
    );
  }
};

const Rack = mongoose.model("rack", RackSchema);

module.exports = Rack;
