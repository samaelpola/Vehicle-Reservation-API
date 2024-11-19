
class AlreadyReservedError extends Error {
    constructor(msg) {
        super(msg);
    }
}

module.exports = {AlreadyReservedError};
