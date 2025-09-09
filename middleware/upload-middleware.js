const multer = require('multer');
const path = require('path');

// Konfiguracija za čuvanje fajlova
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Direktorijum gde će fajlovi biti sačuvani
  },
  filename: function (req, file, cb) {
    // Kreiraj jedinstveno ime fajla sa originalnim ekstenzijama
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = path.parse(file.originalname).name; // Ime bez ekstenzije
    const extension = path.extname(file.originalname); // Ekstenzija
    cb(null, `subject-pdf-${uniqueSuffix}${extension}`);
  }
});

// Filtriranje fajlova - samo PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Samo PDF fajlovi su dozvoljeni'), false);
  }
};

const upload = multer({
  storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 1000 // 5MB limit
//   },
  fileFilter: fileFilter
});

module.exports = upload;