const mongoose = require("mongoose");

//const AssociationEnseignantEtudiantParent = require('./associationEnseignantEtudiantParent.model');

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notifications", notificationSchema);

module.exports = Notification;
