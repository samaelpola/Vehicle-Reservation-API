

const auth = (req, res, next) => {
    const tokenKeys = req.headers.authorization.split(" ");

    if (tokenKeys[0] !== "Bearer") {
        return res.sendStatus(401);
    }

    if (tokenKeys[1] !== process.env.TOKEN) {
        return res.sendStatus(403);
    }

    next();
}

module.exports = auth;
