const { verify } = require("jsonwebtoken")

tokenCheck = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const check = verify(token, "secretKey")
        if (check) {
            req.user = check
            next()
        }
        else {
            res.status(401).json({ status: "unauthorized" })
        }
    } catch (error) {
        res.status(401).json({ status: "unauthorized" })
    }
}

authCheck = (req, res, next) => {
    console.log(req.user);
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ status: "not admin" })
    }
}

module.exports = { tokenCheck, authCheck }