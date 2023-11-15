const router = require('express').Router();
const { 
    grabThoughts,
    grabAThought,
    newThought
 } = require('../../controllers/thoughtControl');

router.route('/').get(grabThoughts).post(newThought);
router.route('/:thoughtId').get(grabAThought);

module.exports = router;