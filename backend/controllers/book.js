const Book = require("../models/book");
const multer = require('multer');
const path = require('path');

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append date to filename
    }
});

const upload = multer({ storage: storage });

// Handle adding a book with image
exports.addbook = [upload.single('image'), (req, res) => {
    const bookData = new Book({
        userId: req.body.user_id,
        book: req.body.book,
        author: req.body.author,
        price: req.body.price,
        delivery: req.body.delivery,
        genre: req.body.genre,
        rating: req.body.rating,
        description: req.body.description,
        image: req.file ? req.file.filename : null // Save image filename if present
    });

    bookData.save()
        .then(() => res.send("Post has been added"))
        .catch(e => res.status(500).send(e));
}];


exports.updates = (req, res) => {
    req.files.map(img => {
        const image = img.filename;
        Book.findByIdAndUpdate(req.params.id, { 'file': image }, { upsert: true }, (err, docs) => {
            if (err) {
                return res.status(500).send({ error: "Unsuccessful" });
            } else {
                console.log(image);
                res.send("Profile Picture Update successful!" + docs);
            }
        });
    });
};

// Function for getting all books or filtering by genre
exports.getAllBooks = (req, res) => {
    const genre = req.query.genre;

    const query = genre ? { genre: genre } : {};

    Book.find(query)
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ error: "Failed to fetch books" }));
};

exports.getBooksByUserId = (req, res) => {
    const userId = req.params.userId;
    console.log('Fetching books for user ID:', userId); // Add logging

    Book.find({ userId: userId })
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ error: "Failed to fetch books" }));
};