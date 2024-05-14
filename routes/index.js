var express = require('express');
var router = express.Router();
const sequelize = require("../Db-connection")
const User = require("./users");
const Task = require("./tasks")
const exceljs = require('exceljs');



sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create tables:', err);
});

router.get('/',async function(req, res) {
  let user=await User.findAll()
  let task=await Task.findAll()
  res.render('index', { user,task });

});

router.get('/create-users',function(req,res){
  res.render('create-users')
})

router.post('/add-users', function(req, res){
  let name=req.body.name
  let email=req.body.email
  let mobile=req.body.mobile
  console.log(name,email,mobile)

    
    User.create({ name, email, mobile})
    res.redirect('/')
  
});

router.get('/create-tasks',async function(req, res){
    const users = await User.findAll();
    res.render('create-tasks', { users });
});

router.post('/add-task', function(req, res) {
    const { userId, taskName, taskType } = req.body;
    console.log(userId,taskName,taskType)
    Task.create({ userId, taskName, taskType });
    res.redirect('/');
  
});

router.get('/export-excel',async function(req,res) {

    const workbook = new exceljs.Workbook();
    const userSheet = workbook.addWorksheet('Users');
    const taskSheet = workbook.addWorksheet('Tasks');

    const users = await User.findAll()
    const tasks = await Task.findAll()
    // console.log(users,tasks)
    
    userSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Mobile', key: 'mobile', width: 15 }
    ]
    taskSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'User ID', key: 'userId', width: 10 },
      { header: 'Task Name', key: 'taskName', width: 30 },
      { header: 'Task Type', key: 'taskType', width: 15 }
    ];
    users.forEach(user => {
      userSheet.addRow(user.toJSON())
    })
    tasks.forEach(task => {
      taskSheet.addRow(task.toJSON())
    })
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users-tasks.xlsx')

    await workbook.xlsx.write(res)
    res.end()
});
module.exports = router;
