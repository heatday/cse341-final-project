const express = require('express');
const router = express.Router();

const controller = require('../controllers/forum');

router.get('/', controller.getAll);
router.get('/:forumId', controller.getOne);
router.get('/:forumId/:commentId', controller.getCommentFromThread);

router.post('/', controller.postForum);
router.post('/:forumId/:commentId', controller.postCommentOnForum);

router.put('/:forumId', controller.updateForum);
router.put('/:forumId/:commentId', controller.editCommentOnForum);

router.delete('/:forumId', controller.deleteForum);
router.delete('/:forumId/:commentId', controller.deleteCommentOnForum);

module.exports = router;