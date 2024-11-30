import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    // Check if authorization header exists
    if (!authorization) return res.status(401).json({ error: "Token not found" });

    // Extract token from the "Bearer <token>" format
    const token = authorization.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    const expiresIn = process.env.JWT_EXPIRES_IN || 600; // Default to 600 seconds
    try {
        return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn });
    } catch (err) {
        console.error("Error generating token:", err.message);
        throw new Error("Failed to generate token");
    }
};

export { jwtAuthMiddleware, generateToken };
