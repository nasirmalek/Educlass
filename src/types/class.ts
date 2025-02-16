export interface Class {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  code: string;
  createdAt: string;
  students: string[];
}

export interface ClassInput {
  name: string;
  description: string;
}