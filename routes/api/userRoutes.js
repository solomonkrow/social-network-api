const router = require('express').Router();
const { 
    findThinkers,
    whichThinker, 
    newFreeThinker,
    changedThinker,
    lostThinker,
    newFriend,
    byeFriend
} = require('../../controllers/userControl');

router.route('/').get(findThinkers).post(newFreeThinker);

router.route('/:userId')
    .get(whichThinker)
    .put(changedThinker)
    .delete(lostThinker);
    
router.route('/:userId/friends/:friendId')
    .post(newFriend)
    .delete(byeFriend);

module.exports = router;
