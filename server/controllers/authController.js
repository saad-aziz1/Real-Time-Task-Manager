import User from '../config/models/user.js';
import jwt from 'jsonwebtoken';


const signToken = (id) => {
  return jwt.sign({ id }, "MY_SECRET_KEY_123", {
    expiresIn: '30d' 
  });
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: { id: user._id, name: user.name, email: user.email }
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

// LOGOUT 
export const logout = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: "Logged out successfully"
  });
};