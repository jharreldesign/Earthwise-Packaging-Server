const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;






// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

//   if (!token) return res.status(401).json({ error: "Token required" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });

//     req.user = decoded;
//     next();
//   });
// };

// module.exports = verifyToken;