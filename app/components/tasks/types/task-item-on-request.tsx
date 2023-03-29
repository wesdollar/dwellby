import type { LabelProps } from "~/components/tasks/types/label-props";

export interface TaskItemOnRequest {
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
}
