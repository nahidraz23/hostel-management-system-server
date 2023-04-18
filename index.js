const express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql2');
const port = process.env.PORT || 5000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "hms_db"
});

// Middleware
app.use(cors())
app.use(express.json());

// api for reading data
app.get('/get', (req, res)=>{
    const sqlGet = "select * from student";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

// api for creating data
app.post('/student', (req, res)=>{
    const {id, fname, lname, email, self_mobile_no, gurdian_mobile_no, dept_name, year_of_study, blood_group, gender, food_exception} = req.body;
    const sqlInsert = "insert into student (id, fname, lname, email, self_mobile_no, gurdian_mobile_no, dept_name, year_of_study, blood_group, gender, food_exception) values (?)";
    db.query(sqlInsert, [id, fname, lname, email, self_mobile_no, gurdian_mobile_no, dept_name, year_of_study, blood_group, gender, food_exception], (error, result)=>{
        if(error){
            console.log(error);
        }
});
});

// api for updating data (put/ patch)
app.put("/student/:id", (req, res)=>{
    res.send('')
})

// api for deleting data
app.delete('/student/:id', (req, res)=>{
    const {id} = req.params;
    const sqlRemove = "delete from student where id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error){
            console.log(error);
        }
    });   
});

app.listen(port, ()=>{
    console.log(`Server is runnig on port ${port}`)
})