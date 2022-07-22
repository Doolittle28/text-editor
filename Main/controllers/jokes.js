const { User, Joke, Punchline } = require('../models');

const Controller = {
    getAllJoke(req, res) {
        Joke.find({})
            .populate([
                { path: 'punchline', select: '-__v' },
            ])
            .select('-__v')
            .then(JokeData => res.json(JokeData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getJokeById({ params }, res) {
        Joke.findOne({ _id: params.id })
            .populate([
                { path: 'punchline', select: '-__v' },
            ])
            .select('-__v')
            .then(JokeData => {
                if (!JokeData) {
                    res.status(404).json({ message: 'No Joke found with this ID.' });
                    return;
                }
                res.json(JokeData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createJoke({ body }, res) {
        Joke.create(body)
            .then(JokeData => {
                User.findByIdAndUpdate({ _id: body.userId }, { $pull: { Jokes: JokeData._id } }, { new: true })
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No User found with this ID' });
                            return;
                        }
                        res.json(dbUserData);
                    })
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));

    },
    updateJoke({ params, body }, res) {
        Joke.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .select('-__v')
            .then(JokeData => {
                if (!JokeData) {
                    res.status(404).json({ message: 'No Joke found with this ID' });
                    return;
                }
                res.json(JokeData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteJoke({ params }, res) {
        Joke.findOneAndDelete({ _id: params.id })
            .then(JokeData => {
                if (!JokeData) {
                    res.status(404).json({ message: 'No Joke found with this ID' });
                    return;
                }
                User.findOneAndUpdate(
                    { username: JokeData.username },
                    { $pull: { Jokes: params.id } }
                )
                    .then(() => {
                        res.json({ message: 'Successfully deleted the Joke' });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(400).json(err));
    },
    addPunchline({ params, body}, res) {
        Joke.findByIdAndUpdate({ _id: params.JokeId }, { $addToSet: { punchline: body } }, { new: true })
        .then(JokeData => {
            if(!JokeData) {
                res.status(404).json({ message: 'No Joke found with that ID!' });
                return;
            }
            res.json(JokeData)
        })
        .catch(err => res.status(400).json(err));
    },
    deletePunchline({ params }, res) {
        Joke.findByIdAndUpdate( params.JokeId , { $pull: { punchline: { PunchlineId: params.punchline } } }, { new: true })
        .then(JokeData => {
            if(!JokeData) {
                res.status(404).json({ message: 'No Punchline found with this Id!' });
                return;
            }
            res.json(JokeData);
        })
        .catch(err => res.status(400).json(err));
    }

};


module.exports = Controller;