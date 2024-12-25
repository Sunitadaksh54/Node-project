import jwt from 'jsonwebtoken';
import User from '../Model/User.js';
import bcrypt from 'bcrypt';
const JWT_SECRET= "mykey";
// Register
export const registerUser = async (req, res) => {
  const {name, email, password } = req.body;
  try {     // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newuser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
   
    await newuser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);
  const { email, password } = req.body;
  try {
     // Ensure email and password are provided
     if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Find the user in the database
    const user = await User.findOne({ email });//find user in db
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });//user exist or not
      // Compare passwords
   const isMatch = await bcrypt.compare(password, user.password);//match the pasword
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
     // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email  }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
      },});
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
