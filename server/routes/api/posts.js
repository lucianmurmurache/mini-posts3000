const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

// Connect to post collection
async function loadPostsCollection() {
    const client = await
        mongodb
            .MongoClient
            .connect(
                'mongodb+srv://lucian:QFoCa1Ewj6j7ni22@mini-posts-pai4e.mongodb.net/mini-posts3000?retryWrites=true&w=majority',
                { useNewUrlParser: true }
            );
    return client.db('mini-posts3000').collection('posts');
}

module.exports = router;

