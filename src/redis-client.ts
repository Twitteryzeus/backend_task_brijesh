import * as redis from 'redis';
import { envConfigs } from './config';

const redisClient = redis.createClient({
  socket: {
    host: envConfigs.redis.host,
    port: 33713
  },
  password: envConfigs.redis.password,
});

const set = async (key: string = 'BACKEND_TASK_BRIJESH', value: string = '') => {
  try {
    await redisClient.set(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const get = async (key = 'BACKEND_TASK_BRIJESH') => {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { set, get };