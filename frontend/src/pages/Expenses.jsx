import DataGridDemo from "../components/Table";
import { get_expenses,delete_expenses } from "../axios";
const Expenses = () => {
  return <DataGridDemo deleteFn={delete_expenses} getFn={get_expenses}/>
};

export default Expenses;
