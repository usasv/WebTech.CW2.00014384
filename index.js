const express = require("express");
const app = express();
const path = require("path"); // to make app run on every directory
const ejsMate = require("ejs-mate"); //to create partial views
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Task = require("./task");

mongoose.connect(
  "mongodb+srv://user1234:user1234@cluster0.omqnw.mongodb.net/taskManager?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB is Ready!");
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get('/', async (req, res, next)=>{
    try {
        const tasks = await Task.find();
        res.render("main", {tasks})
    } catch (error) {
        next(error)
    }
}
)
app.post('/create', async(req,res, next) => {
    try {
        const {task}=req.body
    
        const newTask= new Task(task);
        await newTask.save()
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})
app.delete('/delete/:id', async(req,res, next)=>{
 try {
     const {id}=req.params;
     await Task.findByIdAndDelete(id);
     res.redirect('/')
 } catch (error) {
     next(error)
 }
})
app.get('/:id/edit/',async(req, res, next)=>{
    try {
        const {id}=req.params
        const task = await Task.findById(id);
        res.render('edit', { task });
    } catch (error) {
        next(error)
    }
})
app.post('/edit/:id', async(req, res, next)=>{
try {
    const {id}=req.params;
    await Task.findByIdAndUpdate(id, req.body.task);
    console.log(req.body.task);
    res.redirect('/')
} catch (error) {
    next(error);
}
})

app.listen(3000, ()=> console.log("Serving on port 3000"))