const mysql2 = require("mysql2");
const DbConection = mysql2.createPool({
  user: process.env.DB_USER,
  database:process.env.DB,
  host: process.env.DB_HOST,
  password: process.env.DB_PAS,
  connectionLimit: 10,
});

// DbConection.execute("select'test'",(error,result)=>{
//   if(error){
//     console.log(error.message)
//   }else{
//     console.log(result)
//   }
// });


module.exports = DbConection.promise()

//let user =  CREATE TABLE users(
//     userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY(userid)
// );

//let question = CREATE TABLE questions(
//     id INT(20) NOT NULL AUTO_INCREMENT,
//     questionid VARCHAR(100) NOT NULL UNIQUE,
//     userid INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(20),
//     PRIMARY KEY(id, questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );

//let answer = CREATE TABLE answers(
//     answerid VARCHAR(100) NOT NULL,
//     userid INT(20) NOT NULL,
//     questionid VARCHAR(100) NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     PRIMARY KEY(answerid),
//     FOREIGN KEY(questionid) REFERENCES questions(questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// );
//Dbconection.query(user,(err,result)=>{
//   if(err)throw err
//   console.log('user created')
// })
//Dbconection.query(question,(err,result)=>{
//   if(err)throw err
//   console.log('qustion created')
// })
//Dbconection.query(answer,(err,result)=>{
//   if(err)throw err
//   console.log('answer created')
// })