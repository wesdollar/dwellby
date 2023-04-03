import type { LabelProps } from "./label-props";

export interface TaskItemProps {
  id: number;
  title: string;
  note: string;
  dueDate: Date;
  estimatedCost: string;
  effortId: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
  labels: LabelProps[];
  userId: number;
}
