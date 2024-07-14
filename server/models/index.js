class Game {
    constructor(id) {
        if (typeof id !== 'string' || id.length === 0) {
            throw new Error('Game id is required');
        }
        this.id = id;
        this.name = 'Pong Game';
    }
    stringify() {
        return JSON.stringify(this);
    }
}

module.exports = {
    Game
}