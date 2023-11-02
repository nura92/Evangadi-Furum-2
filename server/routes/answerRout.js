const express = require("express");
const router = express.Router();

const { post_answer, all_answer } = require("../controller/answerconroler");

router.post("/postanswer/:questions_id", post_answer);
router.get("/allanswer/:questions_id", all_answer);

module.exports = router;
