/*

module.exports.authCheck = (req, res, next) => {
    if (req.currentUserData) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

module.exports.verifyRol = (req, res, next) => {
    if (req.currentUserData) {
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } else {
        next();
    }
};

module.exports.signUp = (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)
                .then(() => {
                    res.status(200).json(userCredential.user)
                })
                .catch((error) => {
                    res.status(500).json({ "error": error })
                })
        })
        .catch((error) => {
            res.status(500).json({ "error": error })
        });
}

*/