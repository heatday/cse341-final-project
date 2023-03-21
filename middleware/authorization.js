const authorize = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send({
        error: 'You are not authorized without login.',
        authorize: "cse341-final-project-26gf.onrender.com"
      });
    }
    next();
  };
  
  module.exports = {authorize};

  //http://localhost:8080/login//