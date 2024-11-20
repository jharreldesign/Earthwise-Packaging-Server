const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Permission denied" });
    }
    next();
  };
  
  const verifyStoreManager = (req, res, next) => {
    if (req.user.role !== "store_manager") {
      return res.status(403).json({ error: "Permission denied" });
    }
    next();
  };
  
  module.exports = { verifyAdmin, verifyStoreManager };
  