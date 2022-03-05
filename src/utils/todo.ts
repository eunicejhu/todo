import { hasLocalStorage } from "./isClient";
import isEmpty from "lodash.isempty";

export interface iTodo {
  id: string;
  text: string;
  completed: boolean;
  date: number;
}

export interface iTodos {
  [key: string]: iTodo;
}

export function todosFromLocalStorage(todos?: iTodos): iTodos {
  if (hasLocalStorage()) {
    if (!isEmpty(todos)) {
      localStorage.setItem("trustpair_current_todos", JSON.stringify(todos));
    }
    const currentTodos = JSON.parse(
      localStorage.getItem("trustpair_current_todos") || "{}"
    ) as iTodos;
    return currentTodos;
  }
  return {};
}

const completed = (todos: iTodo[]) =>
  todos.filter((todo) => todo.completed === true);

const notCompleted = (todos: iTodo[]) =>
  todos.filter((todo) => todo.completed !== true);

export const sortCompletedFirst = (todos: iTodo[]) => {
  return sortDateDsc(completed(todos)).concat(sortDateDsc(notCompleted(todos)));
};

export const sortNonCompletedFirst = (todos: iTodo[]) => {
  return sortDateDsc(notCompleted(todos)).concat(sortDateDsc(completed(todos)));
};

export const sortDateAsc = (todos: iTodo[]) =>
  todos.sort((a, b) => a.date - b.date);

export const sortDateDsc = (todos: iTodo[]) =>
  todos.sort((a, b) => b.date - a.date);
