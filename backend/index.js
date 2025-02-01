// const express = require('express')
// const app = express();
// require('./database/database')
// const user2Router = require('./routes/userRoutes');
// const addbook = require('./routes/bookroute');
// const cart = require('./routes/cartroute');
// const payment = require('./routes/paymentRoutes');

// require('dotenv').config();




// const path = require("path");
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const publicdirectory = path.join(__dirname, 'public');


// const cors = require('cors');

// app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.static(publicdirectory));
// app.use(express.json());


// app.use(user2Router);
// app.use(addbook);
// app.use(cart);
// app.use(payment);
// app.listen("3000");
// console.log('Server runs at http://localhost:' + 3000);


//===============================================================================================================================

const express = require('express');
const app = express();
require('./database/database');
const user2Router = require('./routes/userRoutes');
const addbook = require('./routes/bookroute');
const cart = require('./routes/cartroute');
const payment = require('./routes/paymentRoutes');

require('dotenv').config();
const path = require("path");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3001", // ✅ Allows frontend requests
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"]
};

const cookieParser = require('cookie-parser'); // ✅ Added for handling cookies

const helmet = require("helmet");

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "http://localhost:3000", "http://localhost:3000/uploads"], // ✅ Added localhost:3000
                frameAncestors: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);






const publicdirectory = path.join(__dirname, 'public');

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Disposition"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // ✅ Allows image requests
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Keeps security intact
    next();
});


app.use(cors(corsOptions));


app.use(cookieParser()); // ✅ Added to parse cookies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicdirectory));
app.use(express.json());

app.use(user2Router);
app.use(addbook);
app.use(cart);
app.use(payment);

app.listen(3000);
console.log('Server runs at http://localhost:' + 3000);
