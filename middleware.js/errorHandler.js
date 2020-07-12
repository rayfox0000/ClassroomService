
const handleErrors = (err, req, res, next) => {
    console.log(err);
    return res.status(400).json({
        message: err.message
    });
}

module.exports = handleErrors;
