const mongoose = require("mongoose");

const kundaliSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // link to the user
    dateOfBirth: { type: Date, required: true },
    timeOfBirth: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    countryOfBirth: { type: String, required: true },
    kundaliData: { type: Object, required: true }, // Store the generated Kundali data here
  },
  { timestamps: true }
);

const Kundali = mongoose.model("Kundali", kundaliSchema);

module.exports = Kundali;
