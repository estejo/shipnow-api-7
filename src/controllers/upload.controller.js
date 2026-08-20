const Document = require('../models/document.model');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha adjuntado ningún archivo.' });
    }

    const newDocument = new Document({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size
    });

    await newDocument.save();
    return res.status(201).json({ message: 'Archivo subido correctamente', data: newDocument });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno al procesar el archivo', error: error.message });
  }
};

module.exports = { uploadFile };