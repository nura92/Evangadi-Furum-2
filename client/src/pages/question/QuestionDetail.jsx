import React from 'react'


import { CgProfile } from "react-icons/cg";
import { FaGreaterThan } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import Profile_icon from '../../assets/img/profile_icon.webp'
import './question.css'

function QuestionDetail({question}) {
  const navigate = useNavigate()
  const handleclick = ()=>{
   navigate(`/Answer/${question.questions_id}`)
  }
  return (
    <div className='header_question ' onClick={handleclick}>
      <div className='question_user'>
        <img src={Profile_icon} className='profile' alt="" />
        <div className='username'>{question?.user_name}</div>
      </div>

      <div className='question_title' >
      <div className='question_conten'>{question?.title}</div>
      <div className='question_arrow '>
        < FaGreaterThan/>
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail