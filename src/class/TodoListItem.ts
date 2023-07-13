import { TodoListFormat } from "../interface/TodoListFormat.js";

export class TodoListItem implements TodoListFormat {
  constructor(readonly id: number, readonly item: string) {}
}
