import { Todo as TodoModel } from "../../schema/item.model";

const testToFind = async () => {
  try {
    console.log(await TodoModel.find());
  } catch (error) {
    console.log(error);
  }
};

export default testToFind;