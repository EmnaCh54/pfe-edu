const Admin = require("../../models/admin.model");
const ContenuEducatif = require("../../models/contenueducatif.model");
const Utilisateur = require("../../models/utilisateur.model");

exports.updateAdminProfile = async (req, res) => {
  const adminId = req.params.id; // Utiliser le même nom de paramètre

  try {
    // Mettre à jour l'enseignant avec le corps de la requête
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      {
        utilisateur_id: req.body.utilisateur_id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        adresse: req.body.adresse,
        role: req.body.role,
      },
      { new: true }
    );

    if (!admin) {
      return res.status(404).send({
        message: `Admin non trouvé avec l'ID ${adminId}`,
      });
    }

    // Mettre à jour l'utilisateur
    const utilisateurId = admin.utilisateur_id;
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      utilisateurId,
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mot_de_passe: req.body.mot_de_passe,
        email: req.body.email,
        adresse: req.body.adresse,
        role: req.body.role,
      },
      { new: true }
    );

    // Renvoyer la réponse
    res.send({ admin, utilisateur });
  } catch (err) {
    console.error(err);

    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: `Admin non trouvé avec l'ID ${adminId}`,
      });
    }

    return res.status(500).send({
      message: `Erreur lors de la mise à jour de l'Admin avec l'ID ${adminId}`,
    });
  }
};

exports.getAdminProfile = async (req, res) => {
  const adminId = req.params.id;

  try {
    const admin = await Admin.findById(adminId);
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.activateAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const activatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { statut: "actif" },
      { new: true }
    );
    res.json(activatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deactivateAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    const deactivatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { statut: "inactif" },
      { new: true }
    );
    res.json(deactivatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.stat = async (req, res) => {
  try {
    const aggregationResult = await Utilisateur.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          role: "$_id",
          count: 1,
        },
      },
    ]);

    // Initialize counts to 0
    let counts = {
      Etudiant: 0,
      Parent: 0,
      Enseignant: 0,
    };

    // Populate counts based on the result
    aggregationResult.forEach((doc) => {
      counts[doc.role] = doc.count;
    });

    // Create the result array
    const resultArray = [counts.Etudiant, counts.Parent, counts.Enseignant];

    return res.status(200).json(resultArray);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.statContent = async (req, res) => {
  try {
    const aggregationResult = await ContenuEducatif.aggregate([
      {
        $group: {
          _id: "$type_contenus",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type_contenus: "$_id",
          count: 1,
        },
      },
    ]);

    // Initialize counts to 0
    let counts = {
      Tests: 0,
      Devoir: 0,
      Cours: 0,
      Exercice: 0,
    };

    // Populate counts based on the result
    aggregationResult.forEach((doc) => {
      counts[doc.type_contenus] = doc.count;
    });
    // Create the result array
    const resultArray = [counts.Tests, counts.Devoir, counts.Cours ,counts.Exercice];
    return res.status(200).json(resultArray);
  } catch (err) {
    return res.status(500).json(err);
  }
};
