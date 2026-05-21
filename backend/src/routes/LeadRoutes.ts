import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from "../controllers/LeadController";
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLead);

router.get("/", authMiddleware, getLeads);

router.get(
  "/export/csv",
  authMiddleware,
  exportLeadsCSV
);

router.put("/:id", authMiddleware, updateLead);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteLead
);

export default router;