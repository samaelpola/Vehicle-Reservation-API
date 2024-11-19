

const auth = (req, res, next) => {
    const tokenKeys = req.headers.authorization.split(" ");
    if (tokenKeys[1] !== process.env.TOKEN) {
        res.status(403).send("UNAUTHORIZED");
        return;
    }
    next();
}

module.exports = auth;
