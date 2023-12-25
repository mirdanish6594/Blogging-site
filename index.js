import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [];

app.post('/create', (req, res) => {
    const { heading, date, content } = req.body;
    const post = { heading, date, content };
    blogPosts.push(post);
    res.redirect('/');
  });

  app.post('/edit/:index', (req, res) => {
    const index = req.params.index;
    const { heading, date, content } = req.body;
    blogPosts[index] = { heading, date, content };
    res.redirect('/');
  });

  app.post('/delete/:index', (req, res) => {
    const index = req.params.index;
    blogPosts.splice(index, 1);
    res.redirect('/');
  });

  app.get("/", (req, res) => {
    res.render("index.ejs", { locals: { blogPosts } });
  });

  app.get('/form.ejs', (req, res) => {
    res.render("form.ejs", { blogPosts });
  });

app.listen(port, () =>{
    console.log(`Server is running at port ${port}`);
});