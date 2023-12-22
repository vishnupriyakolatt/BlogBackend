import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });

    if (isExisting) {
      throw new Error('Already registered using this email');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const { password, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    return res.status(201).json({ user: others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password);

    if (!comparePassword) {
      throw new Error('Invalid credentials');
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    return res.status(200).json({ user: others, token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

