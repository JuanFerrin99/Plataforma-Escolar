module.exports.authCheck = (req, res, next) => {
    console.log(req.currentUserData)
    if (req.currentUserData) {
        console.log("Ya estoy logueado")
        res.redirect(`/${req.currentUserData.rol}`);
    } else {
        console.log("No estoy logueado")
        next();
    }
};

//TODO: Funcion que compruebe que el rol del usuario coincida con lo que intenta acceder
/*module.exports.verifyRol = (req, res, next) => {
    if (req.currentUserData) {
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL);
    } else {
        next();
    }
}*/

//TODO: Funcion que compruebe que el usuario no altero el token