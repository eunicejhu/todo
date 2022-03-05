import {
  iTodos,
  iTodo,
  sortCompletedFirst,
  sortNonCompletedFirst,
  sortDateDsc,
  sortDateAsc,
} from "./todo";
const todos: iTodos = JSON.parse(
  '{"3cdd06ad-c8bd-4f07-a9ed-1ce15d269cb8":{"id":"3cdd06ad-c8bd-4f07-a9ed-1ce15d269cb8","text":"check email","completed":true,"date":1646560150777},"7d594578-3de2-4501-8a4e-893d6e9baeee":{"id":"7d594578-3de2-4501-8a4e-893d6e9baeee","text":"do sport","completed":false,"date":1646636286430},"d4d6800e-b178-4e42-8275-36e1b4f39d98":{"id":"d4d6800e-b178-4e42-8275-36e1b4f39d98","text":"read a book","completed":true,"date":1646636287005},"de52f629-18e3-4173-af2c-e8488ea8674d":{"id":"de52f629-18e3-4173-af2c-e8488ea8674d","text":"write a technical blog","completed":false,"date":1646636287589}}'
);
let todosArray: iTodo[];
let sorted: iTodo[];
beforeAll(() => {
  todosArray = Object.values(todos);
});
beforeEach(() => {
  sorted = [];
});

describe("test sorting", () => {
  it("test sortCompletedFirst", () => {
    sorted = sortCompletedFirst(todosArray);
    expect(sorted.length).toEqual(todosArray.length);
    expect(sorted[0].completed).toBeTruthy();
  });
  it("test sortNonCompletedFirst", () => {
    sorted = sortNonCompletedFirst(todosArray);
    expect(sorted.length).toEqual(todosArray.length);
    expect(sorted[0].completed).toBeFalsy();
  });
  it("test sortDateDsc", () => {
    sorted = sortDateDsc(todosArray);
    expect(sorted.length).toEqual(todosArray.length);
    expect(sorted[0].text).toBe("write a technical blog");
  });
  it("test sortDateAsc", () => {
    sorted = sortDateAsc(todosArray);
    expect(sorted.length).toEqual(todosArray.length);
    expect(sorted[0].text).toBe("check email");
  });
});
