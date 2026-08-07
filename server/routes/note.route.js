import express from "express";
import Note from "../models/note.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import protect from "../middleware/protect.middleware.js";
const routerNote = express.Router();

//craete Note
routerNote.post("/note", protect, async (req, res) => {
  try {
    // const {
    //   title,
    //   description,
    //   category,
    //   priority,
    //   pinned,
    //   archived,
    //   userId = req.user.id,
    // } = req.body;
    const { title, description, category, priority, pinned, archived } =
      req.body;

    const userId = req.user.id;
    // const note = await Note.create({
    //   title,
    //   description,
    //   category,
    //   priority,
    //   pinned,
    //   archived,
    //   userId,
    // });
    const note = await Note.create({
      title,
      description,
      category,
      priority,
      pinned,
      archived,
      userId,
    });
    res.status(201).json({
      success: true,
      message: "Note Created successfully",
      data: note,
    });
  } catch (error) {
    {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
});

//Get Notes
// routerNote.get("/note", async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.status(200).json({
//       success: true,
//       data: notes,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

routerNote.get("/note", protect, async (req, res) => {
  try {
    const { search = "", page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;

    const filter = {
      userId: req.user.id,
    };

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const totalNotes = await Note.countDocuments(filter);

    const notes = await Note.find(filter)
      .sort({
        pinned: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: notes,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalNotes / limit),
        totalNotes,
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
//update Note
routerNote.put("/note/:id", protect, async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//Delete Note
routerNote.delete("/note/:id", protect, async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id, req.body);
    if (!deleteNote) {
      res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Note Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default routerNote;
