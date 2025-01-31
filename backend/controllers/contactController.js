const Contact = require('../models/contact');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({ message: 'Contact message saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contact message' });
    }
};
