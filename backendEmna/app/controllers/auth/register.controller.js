const bcrypt = require("bcrypt");
const Utilisateur = require("../../models/utilisateur.model");
const Parent = require("../../models/parent.model");
const Admin = require("../../models/admin.model");
const Enseignant = require("../../models/enseignant.model");
const Etudiant = require("../../models/etudiant.model");
var uniqid = require("uniqid");

const jwt = require("jsonwebtoken");
function generateUniqueId() {
  // Generate 5 random digits
  let digits = "";
  for (let i = 0; i < 5; i++) {
    digits += Math.floor(Math.random() * 10);
  }

  // Generate 1 random uppercase letter
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  // Generate a random position to insert the letter
  const randomPosition = Math.floor(Math.random() * 6);

  // Insert the letter into the digits string at the random position
  const uniqueId =
    digits.slice(0, randomPosition) +
    randomLetter +
    digits.slice(randomPosition);

  return uniqueId;
}
exports.register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      mot_de_passe,
      email,
      adresse,
      date_naissance,
      role,
      specialite,
      inscriptionNumber,
      niveau_educatif, //
      statut,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await Utilisateur.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Créer un nouvel utilisateur
    const newUser = new Utilisateur({
      nom,
      prenom,
      mot_de_passe: hashedPassword,
      email,
      date_naissance,
      adresse,
      role,
      statut,
    });

    // Enregistrez l'utilisateur
    await newUser.save();
    console.log("Utilisateur enregistré :", newUser);

    switch (role) {
      case "Parent":
        const etud = await Etudiant.findOne({
          inscriptionNumber: inscriptionNumber,
        });
        if (!etud) {
          return res.status(400).json({
            message: "Numéro Inscription Étudiant non trouve verifier SVP",
          });
        }
        console.log("etud", etud);
        const newParent = new Parent({
          etudiant_id: etud._id,
          utilisateur_id: newUser._id,
        });
        await newParent.save();
        break;
      case "Admin":
        const newAdmin = new Admin({
          utilisateur_id: newUser._id,
        });
        await newAdmin.save();
        break;
      case "Enseignant":
        const newEnseignant = new Enseignant({
          specialite, // champ text
          niveau_educatif, // 1er ===> bac
          utilisateur_id: newUser._id,
        });
        await newEnseignant.save();
        break;
      case "Etudiant":
        const newEtudiant = new Etudiant({
          niveau_educatif, // This should match the field name in your model  1er ===> bac
          utilisateur_id: newUser._id,
          inscriptionNumber: generateUniqueId(),
        });
        await newEtudiant.save();
        break;
    }
    if (newUser) {
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Register successful",
        token,
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role,
        nom: newUser.nom,
        prenom: newUser.prenom,
      });
    } else {
      res.status(401).json({
        message: "something wen wrong ",
      });
    }
    // Retourner les informations de l'utilisateur nouvellement enregistré
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Inscription non réussie" });
  }
};
