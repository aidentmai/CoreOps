export type GetTask = {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    teamId: number;
}

export type AddTask = {
    id: number;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}