const Kundali = require("../models/kundali.model");
const { compareKundalis } = require("../../utils/matchmakingUtils");
exports.createKundali = async (req, res) => {
  const {
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    countryOfBirth,
    kundaliData,
  } = req.body;

  if (
    !dateOfBirth ||
    !timeOfBirth ||
    !placeOfBirth ||
    !countryOfBirth ||
    !kundaliData
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newKundali = new Kundali({
      userId: req.user._id, // Using the user ID from the JWT token
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      countryOfBirth,
      kundaliData,
    });

    await newKundali.save();
    res.status(201).json(newKundali);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Kundali" });
  }
};

// READ (All): Get all Kundali records for the logged-in user
exports.getAllKundalis = async (req, res) => {
  try {
    const kundalis = await Kundali.find({ userId: req.user._id });
    res.json(kundalis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve Kundali data" });
  }
};

// READ (Single): Get a specific Kundali record by ID
exports.getKundaliById = async (req, res) => {
  try {
    const kundali = await Kundali.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }
    res.json(kundali);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve Kundali" });
  }
};

// UPDATE: Update a specific Kundali record by ID
exports.updateKundali = async (req, res) => {
  const {
    dateOfBirth,
    timeOfBirth,
    placeOfBirth,
    countryOfBirth,
    kundaliData,
  } = req.body;

  if (
    !dateOfBirth ||
    !timeOfBirth ||
    !placeOfBirth ||
    !countryOfBirth ||
    !kundaliData
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedKundali = await Kundali.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { dateOfBirth, timeOfBirth, placeOfBirth, countryOfBirth, kundaliData },
      { new: true }
    );

    if (!updatedKundali) {
      return res
        .status(404)
        .json({ message: "Kundali not found or not authorized" });
    }

    res.json(updatedKundali);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update Kundali" });
  }
};

// DELETE: Delete a specific Kundali record by ID
exports.deleteKundali = async (req, res) => {
  try {
    const deletedKundali = await Kundali.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedKundali) {
      return res
        .status(404)
        .json({ message: "Kundali not found or not authorized" });
    }

    res.json({ message: "Kundali deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete Kundali" });
  }
};

// Matchmaking: Accept data for both male and female Kundalis
exports.matchKundalis = async (req, res) => {
  try {
    const { maleDetails, femaleDetails } = req.body;

    if (!maleDetails || !femaleDetails) {
      return res
        .status(400)
        .json({ message: "Both male and female Kundali data are required" });
    }

    // Use a matchmaking utility function to compare the two Kundalis
    const matchResult = compareKundalis(maleDetails, femaleDetails);

    // Return the matchmaking result
    if (matchResult.isMatch) {
      res.json({
        message: "Match Found!",
        compatibilityScore: matchResult.score,
      });
    } else {
      res.json({ message: "No Match", compatibilityScore: matchResult.score });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in matchmaking", error: err });
  }
};
