import express from "express";
import {
  createLead,
  getLeads,
} from "../controllers/LeadController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLead);

router.get("/", authMiddleware, getLeads);

export default router;