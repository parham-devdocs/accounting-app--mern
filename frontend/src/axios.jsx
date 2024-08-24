import axios from "axios";

const apiRequest = axios.create({ baseURL: "http://localhost:5000/api/v1/" })

export const get_expenses = () => apiRequest.get(`transactions/get-expenses`)

export const  delete_expenses = (id) => apiRequest.delete(`/transactions/delete-expense/${id}`)


export const get_incomes = () => apiRequest.get("transactions/get-incomes");

export const delete_income = (id) => apiRequest.delete(`delete-income/${id}`);
