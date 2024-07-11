require('dotenv').config()
const { app } = require('./app')
const {redisClient} = require('./redisClient')
const { server } = require('./httpsServer')
const PORT = process.env.PORT ||  3000


server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🚀`)
});

