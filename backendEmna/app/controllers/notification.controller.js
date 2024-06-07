const Notification = require("../models/Notification");

exports.store = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const notification = await newNotification.save();
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.all = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};




