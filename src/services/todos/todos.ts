import { Todo as TodoModel } from '../../schema/item.model';

export const todos = async () => {
  try {
    const todoInstances = await TodoModel.find();
    return todoInstances;
  } catch (error) {
    console.log(error);
    return error;
  }
};