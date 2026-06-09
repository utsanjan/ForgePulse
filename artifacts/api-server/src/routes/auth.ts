import { Router } from "express";
import { db, usersTable } from "@workspace/forgepulse-db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }
    const users = await db.select().from(usersTable).where(eq(usersTable.username, username));
    const user = users[0];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = `pms-token-${user.id}-${Date.now()}`;
    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        email: user.email,
        department: user.department,
      },
    });
  } catch (err) {
    logger.error({ err }, "Login error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, name, role, email, department } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ error: "Username, password and name required" });
    }

    // Prevent duplicate usernames
    const existing = await db.select().from(usersTable).where(eq(usersTable.username, username));
    if (existing.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const insert = await db.insert(usersTable).values({
      username,
      password,
      name,
      role: role ?? "Plant Supervisor",
      email: email ?? null,
      department: department ?? null,
    }).returning();

    const created = Array.isArray(insert) ? insert[0] : insert;

    const token = `pms-token-${created.id}-${Date.now()}`;

    return res.status(201).json({
      token,
      user: {
        id: created.id,
        username: created.username,
        name: created.name,
        role: created.role,
        email: created.email,
        department: created.department,
      },
    });
  } catch (err) {
    logger.error({ err }, "Register error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
    const tokenParts = authHeader.replace("Bearer ", "").split("-");
    const userId = parseInt(tokenParts[2]);
    if (!userId) return res.status(401).json({ error: "Invalid token" });
    const users = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    const user = users[0];
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email,
      department: user.department,
    });
  } catch (err) {
    logger.error({ err }, "Get me error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
