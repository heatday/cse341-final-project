const authorize = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send({
        error: 'You are not authorized without login. First log in or register with this link',
        authorize: "cse341-final-project-26gf.onrender.com/login"
      });
    }
    next();
  };
  
  module.exports = {authorize};

  //http://localhost:8080/login//