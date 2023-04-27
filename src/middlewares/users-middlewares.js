const usersMiddlewares = {
  usersRedirectHome: async (req, res, next) => {
    try {
      res.redirect('/api');
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

export { usersMiddlewares };
