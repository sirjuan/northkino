const objectIdError = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(503).json({
      type: 'MongoError',
      message: error.message
    });
  }
  next(error);
}



module.exports = [objectIdError];
