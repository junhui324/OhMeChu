<<<<<<< HEAD
// middlewares

//오류처리 미들웨어
=======
//error middlewares
>>>>>>> a711e00dcdd1b48559ab87d1028d9a425788a739
const errorMiddlewares = (err, req, res, next) => {
  console.log(err);
  res.statusCode = err.httpCode ?? 500;
  res.json({
    data: null,
    error: err.message,
  });
};

export { errorMiddlewares };
