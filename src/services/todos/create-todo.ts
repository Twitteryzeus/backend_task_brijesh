import { concat } from 'lodash';
import methods from '../../redis-client';
import { Todo as TodoModel } from '../../schema/item.model';

export const createTodo = async (data = []) => {
  try {
    if (data.length === 0) return [];
    let dataToBeCreated: Array<object> = [];

    let cachedItems: string | Array<object> = await methods.get() || '';
    cachedItems = JSON.parse(cachedItems);

    if (cachedItems.length > 50) {
      dataToBeCreated = concat(dataToBeCreated, cachedItems);
      await methods.clear();
    }

    if (data.length > 50) {
      dataToBeCreated = concat(dataToBeCreated, data.slice(50));
    }

    await methods.set('BACKEND_TASK_BRIJESH', JSON.stringify(data.slice(0, 50)));

    const todoInstances = await TodoModel.insertMany(dataToBeCreated);
    return todoInstances;
  } catch (error) {
    console.log(error);
    return error;
  }
};
