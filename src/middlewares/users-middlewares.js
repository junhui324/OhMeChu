const usersMiddlewares = {
  usersRedirectHome: async (req, res, next) => {
    try {
      res.redirect('/api');
    } catch (err) {
      return next(err);
    }
  },
};

export { usersMiddlewares };
