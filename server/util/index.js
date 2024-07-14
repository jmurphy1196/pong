const { redisClient } = require('../redisClient')

const getGame = async (gameId) => {
    const game = await redisClient.get(gameId);
    return JSON.parse(game);
}

module.exports = {
    getGame
}