const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../../assets/veiculos');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// endpoint de upload de imagem
router.post('/', upload.single('image'), (req, res) => {
    console.log('Recebendo uma requisição de upload');
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }
    
    const imagePath = `/assets/veiculos/${req.file.filename}`;
    console.log('Imagem salva com sucesso:', imagePath);
    res.status(200).json({ imagePath });
});

module.exports = router;
