const DbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

//post answer
const post_answer = async (req, res) => {
  const { answer } = req.body;
  const question_id = req.params.questions_id;
  const { userid } = req.users;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "provide answer field" });
  }
  try {
    await DbConection.query(
      "INSERT INTO answer(questions_id,user_id, answer  ) value(?,?,?)",
      [question_id, userid, answer]
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};

//all answer
const all_answer = async (req, res) => {
  const question_id = req.params.questions_id;
  try {
    const [answer] = await DbConection.query(
      "SELECT answer, user_name FROM answer JOIN newusers ON answer.user_id = newusers.user_id WHERE questions_id = ? ",
      [question_id]
    );
    // const questions = await dbConnection.query("SELECT q.questionid, q.description, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC;" );
    return res.status(StatusCodes.OK).json({ answer });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};

module.exports = { post_answer, all_answer };
