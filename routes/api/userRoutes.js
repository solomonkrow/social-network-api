const router = require('express').Router();
const { 
    findThinkers,
    whichThinker, 
    newFreeThinker,
    changedThinker,
    lostThinker
} = require('../../controllers/userControl');

router.route('/').get(findThinkers).post(newFreeThinker);
router.route('/:userId').get(whichThinker);
router.route('/:userId').get(whichThinker).(changedThinker);
router.route('/:userId').get(whichThinker).delete(lostThinker);

module.exports = router;
