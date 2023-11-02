const DbConection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


//post questions
const postQuestions = async (req, res) => {

  
  const { title, description,tag } = req.body;

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all questions" });
  }

  const userid = req.users.userid;
  // console.log(userid);

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  const question_id = uuid();
  try {
    await DbConection.query(
      " INSERT INTO questions(questions_id,	user_id,title,Discreption,tag ) value(?,?,?,?,?)",
      [question_id, userid, title, description,tag]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({
        msg: "Question posted successfully. Redirecting to home page .",
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};

//all questions
async function allQuestions(req,res){
	// res.send("all questions page")
	try {
		//query all questions from the questions database
		const [allQuestion] = await DbConection.query(
			"SELECT q.title, q.Discreption, q.questions_id ,q.tag ,u.user_name  FROM questions q JOIN newusers u ON q.user_id = u.user_id ORDER BY id DESC;"
		);
    // const questions = await dbConnection.query("SELECT q.questionid, q.description, q.title, u.username FROM questions q JOIN users u ON q.userid = u.userid ORDER BY id DESC;" );
		// console.log(allQuestion.length, " Questions found in the database");
		return res.status(200).json({ allQuestion });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		// console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}

// single questions
// const singleQuestions = async (req, res) => {
//   const questions_id = req.params.questions_id; // Assuming the question ID is passed as a URL parameter
//   console.log(questions_id)
//   try {
//     const [question] = await DbConection.query(
//       "SELECT * FROM questions where questions_id = ? ",
//       [questions_id]
//     );
//     console.log(question[0]);

//     return res.status(StatusCodes.OK).json(question[0]);


//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "somethin went to wrong try again later" });
//   }
// };

// const getQuestionById = async (req, res) => {
//   const questionId = req.params.questionId; // Assuming the question ID is passed as a URL parameter

//   try {
//     const [question] = await dbConnection.query(
//       "SELECT userid, title, description FROM questions WHERE questionid = ?",
//       [questionId]
//     );
//     console.log(questionId);
//     if (question.length === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ msg: "Question not found" });
//     }

//     return res.status(StatusCodes.OK).json({ question });
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Something went wrong, please try again later" });
//   }
// };

async function singleQuestions(req, res) {
  const questionId = req.params.questions_id;
// console.log(questionId)
  try {
    // Perform a SELECT query to fetch a single question by its ID
    const query = "SELECT * FROM questions WHERE questions_id = ?";
    const [question] = await DbConection.query(query, [questionId]);
    // console.log(query)
    // console.log(question[0])

    if (question.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    // Send the retrieved question as a JSON response
    res.status(200).json(question[0]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the question" });
  }
}




module.exports = { postQuestions, singleQuestions, allQuestions };
