export interface ITask {
  title: string;
  description?: string;
  status: boolean;
  id: string | number;
}

export interface TasksState {
  tasks: ITask[];
  isLoading: boolean;
  errors: string[];
  addTask: (_: ITask) => void;
  removeTask: (id: string | number) => void;
  updateTask: (
    id: string | number,
    title: string,
    description?: string,
  ) => void;
  onMarkDone: (id: string | number, status: boolean) => void;
  loadTasks: () => void;
}
