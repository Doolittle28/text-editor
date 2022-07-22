const router = require('express').Router()

const {
    getAllJoke,
    getJokeById,
    createJoke,
    updateJoke,
    deleteJoke,
    addPunchline,
    deletePunchline
} = require('../../controllers/jokes');

router.route('/')
.get(getAllJoke)
.post(createJoke);

router.route('/:id')
.get(getJokeById)
.put(updateJoke)
.delete(deleteJoke);

router.route('/:JokeId/:Punchlines')
.post(addPunchline)
.delete(deletePunchline);

module.exports = router;