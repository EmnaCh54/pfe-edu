const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    // numero inscription
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    extension: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },
  },
  { timestamps: true }
);

const Etudiant = mongoose.model("Documents", DocumentSchema);

module.exports = Etudiant;
