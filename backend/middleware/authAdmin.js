import User from '../models/User.js';

const verifyAdmin = async (req, res, next) => {
  try {
   
    
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next(); // user is admin, continue
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export default verifyAdmin;
