import { concat } from 'lodash';
import redisMethods from '../../redis-client';
import { Todo as TodoModel } from '../../schema/todo.model';

export const createTodo = async (data = []) => {
  try {
    if (data.length === 0) return [];
    let dataToBeCreated: Array<object> = [];

    let cachedItems = await redisMethods.get() || '';
    cachedItems = JSON.parse(cachedItems);

    if (cachedItems.length > 50) {
      dataToBeCreated = concat(dataToBeCreated, cachedItems);
      await redisMethods.clear();
    }

    if (data.length > 50) {
      dataToBeCreated = concat(dataToBeCreated, data.slice(50));
    }

    await redisMethods.set('BACKEND_TASK_BRIJESH', JSON.stringify(data.slice(0, 50)));

    const todoInstances = await TodoModel.insertMany(dataToBeCreated);
    return todoInstances;
  } catch (error) {
    console.log(error);
    return error;
  }
};
