interface LabelProps {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskItemProps {
  title: string;
  dueDate: string;
  labels: LabelProps[];
  statusId: number;
  taskId?: number;
  id?: number;
}
