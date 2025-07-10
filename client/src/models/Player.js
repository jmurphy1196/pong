export default class Player {
    constructor(name, color, width = 10, height = 10, playerNumber = 1) {
        this.name = name;
        this.color = color;
        this.score = 0;
        this.isReady = false;
        this.x = 10;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.playerNumber = playerNumber
    }
    static getPaddleDimmensions(gameSettings) {
        return {
            width: gameSettings.canvasWidth * 0.0125,
            height: gameSettings.canvasHeight * .2, 
        };
    }
    static setPlayerPositions(players, gameSettings ) {
        const paddleDimensions = Player.getPaddleDimmensions(gameSettings);
        players.forEach(player => {
            player.width = paddleDimensions.width;
            player.height = paddleDimensions.height;
            if (player.playerNumber === 1) {
                player.x = player.width;
                player.y = gameSettings.canvasHeight / 2 - player.height / 2;
            } else {
                player.x = gameSettings.canvasWidth - (player.width * 2);
                player.y = gameSettings.canvasHeight / 2 - player.height / 2;
            }
        });
    }
}