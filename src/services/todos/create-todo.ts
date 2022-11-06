import { Todo as TodoModel } from '../../schema/item.model';

export const createTodo = async (data = []) => {
  try {
    if (data.length === 0) return [];

    const todoInstances = await TodoModel.insertMany(data);
    return todoInstances;
  } catch (error) {
    console.log(error);
    return error;
  }
};
