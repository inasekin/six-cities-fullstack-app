import {User} from './user.js';

export type ReviewApi = {
    id: string;
    text: string;
    rating: number;
    createdDate: Date;
    user: User;
};
