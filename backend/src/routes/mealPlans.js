const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMealPlan,
  addEntry,
  removeEntry,
} = require("../controllers/mealPlanController");

router.get("/", auth, getMealPlan);
router.post("/entries", auth, addEntry);
router.delete("/entries/:entryId", auth, removeEntry);

module.exports = router;
