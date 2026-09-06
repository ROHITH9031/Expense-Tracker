import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ==============================
// SIGNUP
// ==============================
export const signup = async (req, res) => {
try {
const { name, email, password } = req.body;

// Validation
if (!name || !email || !password) {
  return res.status(400).json({
    message: "Please provide name, email and password",
  });
}

// Check existing user
const existingUser = await User.findOne({
  email,
});

if (existingUser) {
  return res.status(400).json({
    message: "User already exists",
  });
}

// Hash password
const hashedPassword = await bcrypt.hash(
  password,
  10
);

// Create user
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

// Create JWT
const token = jwt.sign(
  {
    userId: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

return res.status(201).json({
  message: "Account created successfully",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});


} catch (error) {
console.error("Signup error:", error);


return res.status(500).json({
  message: "Signup failed",
});


}
};

// ==============================
// LOGIN
// ==============================
export const login = async (req, res) => {
try {
const { email, password } = req.body;


// Validation
if (!email || !password) {
  return res.status(400).json({
    message: "Please provide email and password",
  });
}

// Find user
const user = await User.findOne({
  email,
});

if (!user) {
  return res.status(401).json({
    message: "Invalid email or password",
  });
}

// Compare password
const isPasswordCorrect =
  await bcrypt.compare(
    password,
    user.password
  );

if (!isPasswordCorrect) {
  return res.status(401).json({
    message: "Invalid email or password",
  });
}

// Create JWT
const token = jwt.sign(
  {
    userId: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

return res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});


} catch (error) {
console.error("Login error:", error);

return res.status(500).json({
  message: "Login failed",
});


}
};
