import Redis from 'ioredis';

let redis;

if (!global.redis) {
    global.redis = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        enableOfflineQueue: false, // commands fail immediately if Redis is down
        connectTimeout: 1000, // optional: faster fail
    });

    global.redis.on('error', (err) => {
        console.error('Redis connection error ❌');
    });
}

redis = global.redis;

export default redis;
