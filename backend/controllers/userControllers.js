const Users = require("../models/userModels");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");



// Rate limiter to prevent brute-force attacks on login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: "Too many failed login attempts. Please try again after 15 minutes."
});

//function for adding trip
exports.adduser = (req, res) => {
    const User = new Users(
        req.body)
    User.save().then(function () {
        res.send("User has been added")
    }).catch(function (e) {
        res.send(e)
    })
}




// Using the old hardcoded JWT secret

exports.login = [loginLimiter, async (req, res) => {
    try {
        const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }

        const token = await user.generateAuthToken();

        res.json({
            token: token,
            success: true,
            user: user
        });
    } catch (e) {
        console.error("Login error:", e);
        res.status(500).send({ success: false, message: "Internal server error." });
    }
}];







exports.logincheck = async (req, res) => {
    res.send(req.user);
    console.log(req.user);
};



// //get ko lagi code
exports.finduser = async (req, res) => {
    try {
        const findAlluser = await Users.find();
        res.send(findAlluser);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.profile = (req, res) => {
    Users.findById(req.params._id
    ).then(function (userdetail) {
        res.send(userdetail)
    })
}


exports.delete = function (req, res) {
    Users.findByIdAndDelete(req.params.id).then(function () {

    }).catch(function () {
        res.send(e)
    })
};


// exports.update = function (req, res) {
//     console.log(req.body)
//     Users.findByIdAndUpdate(req.params.id, req.body).then(function () {
//         res.send("updated")
//     }).catch(function (e) {
//         res.send(e)
//     })

// }

exports.update = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Updating user:", user);

        // Verify current password before allowing an update
        const isMatch = await user.comparePassword(req.body.currentPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect." });
        }

        console.log("Current password verified");

        // Ensure new password meets security criteria
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.newPassword)) {
            return res.status(400).json({ success: false, message: "New password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character." });
        }

        console.log("New password validated");

        // Prevent password reuse
        for (const oldPassword of user.previousPasswords) {
            if (await user.comparePassword(req.body.newPassword, oldPassword)) {
                return res.status(400).json({ success: false, message: "You cannot reuse old passwords. Choose a new one." });
            }
        }

        console.log("Password reuse check passed");

        // Update user details
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.email = req.body.email;

        // Update password
        try {
            await user.updatePassword(req.body.currentPassword, req.body.newPassword);
            console.log("Password updated successfully");
        } catch (err) {
            console.error("Error updating password:", err);
            return res.status(500).json({ success: false, message: "Failed to update password." });
        }

        await user.save();
        res.json({ success: true, message: "Profile updated successfully." });
    } catch (e) {
        console.error("Update error:", e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



exports.logout = (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
}


exports.admin = function (req, res) {
    user_type = req.user_type
    if (user_type == "admin") {
        res.send("hello admin")
    }
    else {
        res.send("please authenticate..");
    }
}

exports.updates = function (req, res) {
    const img = req.file.filename;

    Users.findByIdAndUpdate(req.params.id, { 'file': img }, { upsert: true }, (err, docs) => {
        if (err) {
            return res.status(500).send({ error: "unsuccessful" });
        } else {
            console.log(img);
            res.send("Profile Picture Update successful!" + docs);
        }
    });
}
