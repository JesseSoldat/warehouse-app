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
    racks: [
      {
        type: Schema.Types.ObjectId,
        ref: "rack"
      }
    ]
  },
  { timestamps: true }
);

const Storage = mongoose.model("storage", StorageSchema);

module.exports = Storage;
