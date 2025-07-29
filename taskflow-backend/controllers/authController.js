import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import UserLog from '../models/UserLog.js';

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role

    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const role = req.body.role || 'user';

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    const token = createToken(newUser);
    res.status(201).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Registration failed', error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.comparePassword(req.body.password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = createToken(user);

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await UserLog.create({
      user: user._id,
      username: user.username,
      role: user.role,
      ip: ip,
      loginAt: new Date(),
      tokenName: req.headers["user-agent"],
    });


    res.json({ token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
