import React from 'react'
import { CgProfile } from "react-icons/cg";
function AnswerDetsil({answers}) {
  return (
    <div className="header_question">
    <div className="question_user" style={{ textAlign: "center" }}>
      <CgProfile style={{ width: "90%", height: "80%" }} />
      <span>{answers ? answers.user_name : "Unknown User"} </span>
    </div>
    <div className="question_title" style={{ height: "80%" }}>
      <div className='question_conten'> {answers ? answers.answer : "New Answer"}</div>
    </div>
  </div>
  )
}

export default AnswerDetsil