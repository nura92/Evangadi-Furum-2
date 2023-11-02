async function singleQuestions(req, res) {
  const questionId = req.params.questions_id;
  // console.log(questionId);
  try {
    // Perform a SELECT query to fetch a single question by its ID
    const query = "SELECT * FROM questions WHERE questions_id = ?";
    const [question] = await DbConection.query(query, [questionId]);
    console.log(query);
    console.log(question[0]);

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
module.exports = singleQuestions;
