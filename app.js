const morgan = require("morgan");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const layout = require('./views/layout.js')
const { db, Page, User } = require('./models');
const userRouter = require('./routes/users')
const wikiRouter = require('./routes/wiki')

app.use(express.static(__dirname + "/public"))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res, next) => {
    res.send(layout(''))
})

app.get('/', (req, res, next) => {
    res.redirect('/wiki')
})

let PORT = 3000;

const init = async () => {
    await db.sync();
    await db.sync({force: true})
    // make sure that you have a PORT constant
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }
  
  init();
