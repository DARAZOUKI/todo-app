export interface Todo {
    _id: any;
    id: string;
    title: string;
    description?: string;
    status: 'Not started' | 'Ongoing' | 'Completed';
  }
  