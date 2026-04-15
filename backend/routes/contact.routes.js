const Contact = require("../models/contact.model");
const router = require("express").Router();
const {
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

// CREATE (Public - From Contact Us page)
router.post("/", async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL (Admin Only)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE STATUS (Admin Only)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE (Admin Only)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json("Message has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
