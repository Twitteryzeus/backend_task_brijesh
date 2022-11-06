import { concat } from 'lodash';
import redisMethods from '../../redis-client';
import { Todo as TodoModel } from '../../schema/todo.model';

export const todos = async () => {
  try {
    const todoInstances = await TodoModel.find({},
      {
        "title": "$title",
        "description": "$description"
      }
    );

    let cachedItems = await redisMethods.get();
    cachedItems = JSON.parse(cachedItems);
    cachedItems = concat(cachedItems, todoInstances);
    return cachedItems;
  } catch (error) {
    console.log(error);
    return error;
  }
};