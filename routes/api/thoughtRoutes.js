const router = require('express').Router();
const {} = require('../../controllers/thoughtControl');

router.route('/').get().post();
router.route('/:thoughtId').get();