export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (err, req, res, next) => {
  req.log.error({ err }, 'Unhandled API error');

  const status = err.statusCode || 500;
  const message = err.expose ? err.message : 'Internal server error';

  res.status(status).json({
    message,
    details: err.details || undefined,
  });

  next();
};
