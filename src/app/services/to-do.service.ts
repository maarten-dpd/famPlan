import {Injectable} from '@angular/core';
import {ToDo} from '../../datatypes/toDo';
import {toDoFilter} from '../../datatypes/filter';
import {Label} from '../../datatypes/label';
import {uuid} from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  #toDoList: ToDo[] = [];

  #id = 0;

  constructor() {

  }

  private static toDoMatchesFilter(toDo: ToDo, filter: toDoFilter): boolean {
    if (toDoFilter.all === filter) {
      return true;
    }

    return filter === toDoFilter.completed && toDo.done ||
      filter === toDoFilter.toDo && !toDo.done;
  }

  getAllToDos(): ToDo[] {
    return this.#toDoList;
  }

  deleteToDo(id: string): void {
    this.#toDoList = this.#toDoList.filter(t => t.id !== id);
  }

  toggleToDoStatus(id: string): void {
    const toDo = this.#toDoList.find(t => t.id === id);
    if (toDo) {
      toDo.done = !toDo.done;
    }
  }
  newToDo(name: string, description: string, deadline: string, labels: Label[] = []): void {
    this.#toDoList.push({
      name,
      id: uuid(),
      done: false,
      description,
      deadline,
      labels
    });
    this.#id++;
  }
  updateToDo(updatedToDo: ToDo): void {
    const toDo = this.#toDoList.find(t => t.id === updatedToDo.id);
    if (toDo === undefined) {
      console.error('Trying to update a nonexistent to do.');
      return;
    }

    Object.assign(toDo, updatedToDo);
  }

  getToDo(id: string): ToDo | undefined {
    return this.#toDoList.find(t => t.id === id);
  }

  getFilteredToDos(filter: toDoFilter): ToDo[] {
    return this.getAllToDos()
      .filter(t => ToDoService.toDoMatchesFilter(t, filter));
  }

  getNumberOfToDos(): number {
    return this.#toDoList.length;
  }

  deleteLabelFromToDo(labelId: number) {

    this.#toDoList.forEach(t => t.labels = t.labels.filter(l => l.id !== labelId));
  }

  getToDosByLabel(labelId: number) {
    return this.#toDoList.filter(t => t.labels.some(l => l.id === labelId));
  }
}
