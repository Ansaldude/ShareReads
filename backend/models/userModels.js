const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false,
    },
    image: {
        type: Object,
        default: 'user.png'
    },
    password: {
        type: String, // Ensure password is stored as a string
        required: true
    },
    previousPasswords: {
        type: [String], // Ensure this is always an array
        default: []
    },
    role: {
        type: String,
        default: 'buyer'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Enforce strong password validation only on new registrations
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     try {
//         if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
//             return next(new Error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."));
//         }
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });



// Enforce strong password validation only on new registrations, but not updates
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this._skipValidation) return next();
    try {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
            return next(new Error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."));
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});




// Compare hashed passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update password with prevention of password reuse
userSchema.methods.updatePassword = async function (currentPassword, newPassword) {
    const user = this;

    // Verify current password before allowing change
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new Error("Current password is incorrect.");
    }

    // Ensure previousPasswords is an array before checking
    if (!Array.isArray(user.previousPasswords)) {
        user.previousPasswords = [];
    }

    // Check if new password was used before
    for (const oldPassword of user.previousPasswords) {
        if (await bcrypt.compare(newPassword, oldPassword)) {
            throw new Error("You cannot reuse old passwords. Choose a new one.");
        }
    }

    // Ensure password complexity before updating
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
        throw new Error("New password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
    }

    // Skip validation in pre-save hook
    user._skipValidation = true;

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Store the new password in history (keep last 3 passwords only)
    user.previousPasswords.unshift(user.password);
    if (user.previousPasswords.length > 3) {
        user.previousPasswords.pop();
    }

    await user.save();
    user._skipValidation = false;
};

// Method to check user credentials
userSchema.statics.checkCrediantialsDb = async (username, password) => {
    const user = await mongoose.model('User').findOne({ username: username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
};

// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
