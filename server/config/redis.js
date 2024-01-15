const Redis = require("ioredis");

const redis = new Redis({
  port: 16663, // Redis port
  host: "redis-16663.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "UFvJV2aeZb8zvaiKpp9tpOsYuKRlBFlA",
});

redis.on("conect", () => {
  console.log("Succes connect redis");
});

redis.on("error", (error) => {
  console.error("Error connecting to Redis", error);
});

module.exports = redis;
