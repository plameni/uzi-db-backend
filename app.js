const express = require('express');
const sequelize = require('./common/db-config');
const path = require('path')
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfiguracija za multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const authRouter = require('./routing/auth-routing');
const authMiddleware = require('./middleware/auth-middleware');
const propertyTypeRouter = require('./routing/property_type-routing');
const roleRouter = require('./routing/role-routing')
const countryRouter = require('./routing/country-routing');
const cityRouter = require('./routing/city-routing.js');
const streetRouter = require('./routing/street-routing.js')
const criminalActRouter = require('./routing/criminal-act-routing.js');
const movablePropertyTypeRouter = require('./routing/movable-property-type-routing.js');
const immovablePropertyRouter = require('./routing/immovable-property-routing.js');
const courtsRouter = require('./routing/court-routing.js');
const unitsOfMeasureRouter = require('./routing/unit-of-measure-routing.js')
const warehouseRouter = require('./routing/warehouse-routing.js');
const subjectTypeRouter = require('./routing/subject-type-routing.js');
const subjectRouter = require('./routing/subject-routing.js');
const entityRouter = require('./routing/entity-routing.js');
const accRouter = require('./routing/acc-routing.js');
const movableRouter = require('./routing/movable-routing.js');
const immovableRouter = require('./routing/immovable-routing.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRouter);
app.use('/api/property-type',authMiddleware, propertyTypeRouter);
app.use('/api/role',authMiddleware, roleRouter);
app.use('/api/country',authMiddleware,countryRouter);
app.use('/api/city', authMiddleware, cityRouter);
app.use('/api/street',authMiddleware, streetRouter);
app.use('/api/criminal-act',authMiddleware, criminalActRouter);
app.use('/api/movable-property-type', authMiddleware, movablePropertyTypeRouter);
app.use('/api/immovable-property-type', authMiddleware, immovablePropertyRouter);
app.use('/api/court', authMiddleware, courtsRouter);
app.use('/api/units-of-measure', authMiddleware, unitsOfMeasureRouter);
app.use('/api/warehouse', authMiddleware, warehouseRouter);
app.use('/api/subject-type', authMiddleware, subjectTypeRouter);
app.use('/api/subject', authMiddleware, subjectRouter);
app.use('/api/entity', authMiddleware, entityRouter);
app.use('/api/acc', authMiddleware, accRouter);
app.use('/api/movable', authMiddleware, movableRouter);
app.use('/api/immovable', authMiddleware, immovableRouter);


sequelize.authenticate()
    .then(() => {
        console.log('Konektovano!');
    })
    .catch((err) => {
        console.log('Nije kontektovano!');
        console.log(err);
    })

app.listen(3000, function(error) {
    console.log("Error: ", error);
    if (error) {
        console.log("Doslo je do greske");
    } else {
        console.log("Server slusa na 3000");
    }
})