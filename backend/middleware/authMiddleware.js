import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
let token;

try {
const authHeader = req.headers.authorization;


if (authHeader && authHeader.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.userId).select("-password");

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  next();
} else {
  return res.status(401).json({
    success: false,
    message: "Not authorized. Token not provided.",
  });
}


} catch (error) {
return res.status(401).json({
success: false,
message: "Not authorized. Invalid or expired token.",
});
}
};

export default protect;
