require("dotenv").config();
const { server } = require("./httpsServer");
const { redisClient } = require("./redisClient");
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await redisClient.connect();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error(err);
  }
})();
