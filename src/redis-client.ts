import * as redis from 'redis';
import { envConfigs } from './config';

const redisClient = redis.createClient({
  socket: {
    host: envConfigs.redis.host,
    port: 33713
  },
  password: envConfigs.redis.password,
});

export default redisClient;