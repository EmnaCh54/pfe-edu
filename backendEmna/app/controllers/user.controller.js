const User = require("../models/utilisateur.model");

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.all = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["Parent", "Etudiant", "Enseignant"] },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.changeStatue = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      statut: req.body.statut,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
