const router = require('express').Router();

router.get('/test', async (req, res) => {
    res.json({ message: 'Hello from the server!' });
})

module.exports = router;

