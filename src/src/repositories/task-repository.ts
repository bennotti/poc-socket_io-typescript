import { Task } from '../entities'
import { NotFoundError } from '../errors'

export class TaskRepository {
  constructor() { }

  public async find(userId: number, id: number): Promise<Task> {
    const row = {
      id: id,
      userId: userId,
      name: '',
      description: '',
      done: false,
      created: new Date(),
      updated: new Date()
    };

    if (!row) {
      throw new NotFoundError('Task does not exist');
    }

    return this.transform(row);
  }

  public async findByUser(
    userId: number,
    limit: number,
    offset: number
  ): Promise<Task[]> {
    const results = [{
      id: 1,
      userId: userId,
      name: '',
      description: '',
      done: false,
      created: new Date(),
      updated: new Date()
    }];
    console.log(limit);
    console.log(offset);
    return results.map((r: any) => this.transform(r));
  }

  public async insert(task: Task): Promise<Task> {
    task.created = new Date();
    task.updated = new Date();

    task.id = 1

    return task;
  }

  public async update(task: Task): Promise<Task> {
    task.updated = new Date();

    return task;
  }

  public async delete(userId: number, taskId: number): Promise<void> {
    const result = userId === 1 && taskId === 1 ? 1 : 0;

    if (result === 0) {
      throw new NotFoundError('Task does not exist')
    }
  }

  private transform(row: any): Task {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      userId: row.user_id,
      done: row.done === 1,
      created: row.created,
      updated: row.updated
    }
  }
}
