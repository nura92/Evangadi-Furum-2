//dbConfig file
const DbConection = require("../db/dbConfig");
// const { use } = require("../routes/userRouter");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { user_name, firs_tname, last_name, email, password } = req.body;

  if (!user_name || !firs_tname || !last_name || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }

  try {
    const [user] = await DbConection.query(
      "SELECT user_name , user_id FROM newusers where user_name = ? or email = ? ",
      [user_name, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already existed" });
    }

    if (password.length <= 7) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ mas: "password must be at least 8 characters" });
    }

    //encrypted password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    await DbConection.query(
      " INSERT INTO newusers(user_name, first_name, last_name, email, password ) value(?,?,?,?,?)",
      [user_name, firs_tname, last_name, email, hashpassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });


  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required field!" });
  }

  try {
    const [user] = await DbConection.query(
      "SELECT user_id, user_name ,password from newusers where email = ?",
      [email]
    );
    // console.log(user)

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credetail" });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credetail password" });
    }

    const username = user[0].user_name;
    const userid = user[0].user_id;

    const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successfuly", token ,username});
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "somethin went to wrong try again later" });
  }
};

const checkuser = async (req, res) => {
  const userid = req.users.userid;
  const username = req.users.username;
  res.status(StatusCodes.OK).json({ msg:"valid user" ,userid , username});
};

const getalluser = async (req,res)=>{
  try {
   const [user]=  await DbConection.query('SELECT user_id, user_name, first_name, last_name, email,password from newusers',[]) 
   res.json(user.length)
  } catch (error) {
    console.log(error.message)
  }
}



module.exports = { register, login, checkuser ,getalluser};
