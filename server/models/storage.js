const mongoose = require("mongoose");
const { Schema } = mongoose;

const StorageSchema = new Schema(
  {
    storageLabel: {
      type: String,
      required: true,
      unique: true
    },
    description: { type: String },
    rackLabelCounter: { type: Number, required: true },
    racks: [
      {
        type: Schema.Types.ObjectId,
        ref: "rack"
      }
    ]
  },
  { timestamps: true }
);

StorageSchema.statics.getRackLabel = async function(storageId) {
  const Storage = this;
  try {
    const storage = await Storage.findByIdAndUpdate(
      storageId,
      { $inc: { rackLabelCounter: 1 } },
      { new: true, upsert: true }
    );
    return Promise.resolve(storage.rackLabelCounter);
  } catch (err) {
    return Promise.reject("An error occured while creating the rack label");
  }
};

const Storage = mongoose.model("storage", StorageSchema);

module.exports = Storage;
