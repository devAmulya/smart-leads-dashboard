import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (req: any, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      status,
      source,
      search,
      page = "1",
      limit = "5",
    } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const currentPage = parseInt(page as string);
    const perPage = parseInt(limit as string);

    const skip = (currentPage - 1) * perPage;

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.json({
      total,
      currentPage,
      totalPages: Math.ceil(total / perPage),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};