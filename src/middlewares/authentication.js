
const {utilService}=require("../services")

const authnticate = (req, res, next) => {
  
  try {
    //return next()
    const token = req.header('Authorization') || req.query["Authorization"];
  
    if (!token) 
      return res.status(401).json({ error: 'No token present in header, authorization denied ' });
    

    const decoded = utilService.decodeToken(token)
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: 'token is not valid, please login again' });
  }
};


module.exports = authnticate
