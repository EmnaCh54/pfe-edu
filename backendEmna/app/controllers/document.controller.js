const Document = require("../models/document.model");

// Mettre à jour l'emploi du temps d'un étudiant
exports.update = async (req, res) => {
  try {
    const resultat = await Document.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(resultat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.store = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file) {
      const extension = getFileExtension(req.file.originalname);
      const url = `/uploads/${req.file.filename}`;
      const { name, description, user } = req.body;
      const newDocument = new Document({
        name,
        description,
        user,
        url,
        extension,
      });
      const document = await newDocument.save();
      res.status(200).json(document);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

function getRandomFileName() {
  return Date.now() + "FA";
}

function getFileExtension(filename) {
  // Split the filename by dots
  const parts = filename.split(".");
  // If there is only one part, there is no extension
  if (parts.length === 1) {
    return "";
  }
  // Return the last part which is the extension
  return parts.pop();
}

exports.all = async (req, res) => {
  try {
    const documents = await Document.find({});
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getDocumentsByUser = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.params.user_id });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(
      req.params.document_id
    );
    if (!deletedDocument) {
      return res.status(404).send({
        message: `Document non trouvée avec l'ID ${req.params.document_id}`,
      });
    }
    res.send({ message: "Document supprimée avec succès!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la Document." });
  }
};
