//error middlewares
const errorMiddlewares = (err, req, res, next) => {
  console.log(err);
  res.statusCode = err.httpCode ?? 500;
  res.json({
    data: null,
    error: err.message,
  });
};

export { errorMiddlewares };
