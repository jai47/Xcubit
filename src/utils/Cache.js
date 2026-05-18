import redis from '../lib/redis';

export async function getOrSetCache(
    key,
    fetchFn,
    ttl = 600,
    hardFetch = false
) {
    let data;

    // Try reading from Redis
    if (!hardFetch) {
        try {
            const cached = await redis.get(key);
            if (cached) {
                console.log('Cache hit ✅');
                return { success: true, data: JSON.parse(cached), cache: true };
            }
        } catch (err) {
            if (err.message.includes("Stream isn't writeable")) {
                console.warn('Redis offline ❌ – skipping cache read');
            } else {
                console.error('Redis read error ❌', err);
            }
        }
    }

    // Fetch from DB
    try {
        data = await fetchFn();
    } catch (err) {
        console.error('Database fetch error ❌', err);
        return { success: false, data: null, cache: false };
    }

    // Try writing to Redis
    try {
        await redis.setex(key, ttl, JSON.stringify(data));
    } catch (err) {
        if (err.message.includes("Stream isn't writeable")) {
            console.warn('Redis offline ❌ – skipping cache write');
        } else {
            console.error('Redis write error ❌', err);
        }
    }

    return { success: true, data, cache: false };
}

export async function deleteCache(key) {
    if (!key) {
        console.warn('deleteCache called without key');
        return { success: false, message: 'No key provided' };
    }

    try {
        const result = await redis.del(key); // returns number of keys deleted
        if (result > 0) {
            console.log(`Cache key deleted ✅: ${key}`);
            return { success: true, message: 'Cache deleted' };
        } else {
            console.log(`Cache key not found ⚠️: ${key}`);
            return { success: false, message: 'Key not found' };
        }
    } catch (err) {
        console.error('Redis delete error ❌', err);
        return { success: false, message: 'Redis delete failed' };
    }
}
