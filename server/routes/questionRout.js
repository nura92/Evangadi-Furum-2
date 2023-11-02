const express = require("express");
const router = express.Router();

//question controller
const {
  postQuestions,
  singleQuestions,
  allQuestions,
} = require("../controller/questionController");

//post quuestion routes
router.post("/post_question", postQuestions);

//all questions routes
router.get("/all_question", allQuestions);

//single questions routes
router.get("/question/:questions_id", singleQuestions);

module.exports = router;
