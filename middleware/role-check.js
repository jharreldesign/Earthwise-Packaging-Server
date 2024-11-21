const verifyAdmin = (req, res, next) => {
  // Check if req.user exists and if their role is 'admin'
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin permission required" });
  }
  next();
};

const verifyStoreManager = (req, res, next) => {
  // Check if req.user exists and if their role is 'store_manager'
  if (!req.user || req.user.role !== "store_manager") {
    return res.status(403).json({ error: "Store Manager permission required" });
  }
  next();
};

module.exports = { verifyAdmin, verifyStoreManager };


// const verifyAdmin = (req, res, next) => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Permission denied" });
//     }
//     next();
//   };
  
//   const verifyStoreManager = (req, res, next) => {
//     if (req.user.role !== "store_manager") {
//       return res.status(403).json({ error: "Permission denied" });
//     }
//     next();
//   };
  
//   module.exports = { verifyAdmin, verifyStoreManager };
  