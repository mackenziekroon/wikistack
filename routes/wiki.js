const express = require('express')
const router = express.Router()
const addPageRouter = require("../views/addPage")
const html = require("html-template-tag");
const layout = require("../views/layout");
const { Page, User } = require("../models");
const { addPage } = require("../views");

module.exports = router
    
function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }





router.post('/', async (req, res, next) => {
    console.log(req.body)
    let title = req.body.title
    let content = req.body['page-content']
    // res.json(req.body)

    try {
        const page = await Page.create({
          title: title,
          content: content
        });
    
        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect('/');
      } catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
    res.send(addPageRouter())
})
router.get('/', (req, res, next) => {
    res.send(layout())
})