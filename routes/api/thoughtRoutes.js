const router = require('express').Router();
const { 
    grabThoughts,
    grabAThought,
    newThought,
    changedThought,
    lostThought,
    newReaction,
    byeReaction
 } = require('../../controllers/thoughtControl');

router.route('/').get(grabThoughts).post(newThought);

router.route('/:thoughtId')
    .get(grabAThought)
    .put(changedThought)
    .delete(lostThought);

router.route('/:thoughtId/reactions')
 .post(newReaction);

router.route('/:thoughtId/reactions/:reactionId')
 .delete(byeReaction);


module.exports = router;