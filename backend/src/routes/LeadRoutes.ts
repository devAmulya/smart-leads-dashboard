import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/LeadController";
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLead);

router.get("/", authMiddleware, getLeads);

router.put("/:id", authMiddleware, updateLead);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteLead
);

export default router;