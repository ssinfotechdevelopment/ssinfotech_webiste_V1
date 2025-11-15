// ------------------------
// Load environment variables
// ------------------------
import dotenv from "dotenv";
dotenv.config();

// ------------------------
// Core dependencies
// ------------------------
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cloudinary from "cloudinary";

// ------------------------
// Local modules
// ------------------------
import connectDB from "./config/db.js";
import jobListingRoutes from "./routes/jobListingRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import slideRoutes from "./routes/slideRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

// ------------------------
// Fix __dirname for ES Modules
// ------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ------------------------
// Initialize Express
// ------------------------
const app = express();

// ------------------------
// Configure Cloudinary
// ------------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ------------------------
// Start Server Function
// ------------------------
const startServer = async () => {
  try {
    // --- Connect to MongoDB ---
    await connectDB();
    console.log("MongoDB connected successfully");

    // ------------------------
    // Allowed Origins for CORS
    // ------------------------
    const allowedOrigins = [
      "https://ssinfotech-omega.vercel.app",
      "https://ssinfotech-xsq6.vercel.app",
      "https://ssinfotech.co",
      "https://www.ssinfotech.co",
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000"
    ].filter(Boolean);

    // --- CORS Middleware ---
    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );

    // --- Body Parsers ---
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });

    // --- Static Files ---
    app.use("/Uploads", express.static(join(__dirname, "Uploads")));
    app.use("/public", express.static(join(__dirname, "public")));

    // --- API Routes ---
    // FIXED: Properly register submission routes
    app.use("/api/submissions", submissionRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/joblistings", jobListingRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/slides", slideRoutes);
    app.use("/api/candidate", candidateRoutes);
    app.use("/api/albums", albumRoutes);

    // Test submission endpoint (direct route)
    app.post("/api/submit", async (req, res) => {
      try {
        console.log("Direct submission received:", req.body);
        res.status(200).json({
          success: true,
          message: "Direct test submission received successfully",
          data: req.body,
          submissionId: "direct-" + Date.now()
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    // --- Health Check (Public) ---
    app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        time: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}s`,
        database: "Connected",
        routes: [
          "/api/submissions/submit",
          "/api/submit",
          "/health",
          "/api/health"
        ]
      });
    });

    // --- Legacy Health ---
    app.get("/api/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        time: new Date().toISOString(),
        message: "API is running correctly"
      });
    });

    // Route to list all available routes
    app.get("/api/routes", (req, res) => {
      const routes = [
        "POST /api/submissions/submit",
        "POST /api/submit",
        "GET /api/submissions",
        "GET /api/submission/:id",
        "GET /health",
        "GET /api/health"
      ];
      res.json({ availableRoutes: routes });
    });

    // ------------------------
    // Serve Frontend (Production - Only if bundled)
    // ------------------------
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL && !process.env.RENDER) {
      const frontendPath = join(__dirname, "../frontend/dist");

      try {
        const fs = await import("fs");
        if (fs.existsSync(frontendPath)) {
          app.use(express.static(frontendPath));

          app.get("*", (req, res) => {
            res.sendFile(join(frontendPath, "index.html"));
          });

          console.log(`Serving frontend from: ${frontendPath}`);
        }
      } catch (err) {
        console.warn("Frontend dist not found. Skipping static serve.");
      }
    }

    // --- 404 Handler ---
    app.use("*", (req, res) => {
      res.status(404).json({
        message: "Route not found",
        requestedPath: req.originalUrl,
        availableEndpoints: [
          "POST /api/submissions/submit",
          "POST /api/submit",
          "GET /health",
          "GET /api/health"
        ]
      });
    });

    // --- Global Error Handler ---
    app.use((err, req, res, next) => {
      console.error("Error Stack:", err.stack);
      res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    });

    // --- Start Server ---
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend API running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
      console.log(`📍 Submit endpoint: http://localhost:${PORT}/api/submissions/submit`);
      console.log("Allowed CORS Origins:");
      allowedOrigins.forEach((url) => console.log(`   → ${url}`));
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

// ------------------------
// Start the Server
// ------------------------
startServer();