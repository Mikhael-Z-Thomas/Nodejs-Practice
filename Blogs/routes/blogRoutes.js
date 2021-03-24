const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogcontroller');
router.get('/',blogController.blog_index);
router.get('/add-blog',blogController.blog_add_post)




//adding a post
router.post('/',blogController.blog_add_post);


//going to create page
router.get('/create', blogController.blog_create_get)

//getting a particular blog
router.get('/:id',blogController.blog_details);

//deleting a blog
router.delete('/:id',blogController.blog_delete_post);

module.exports = router;