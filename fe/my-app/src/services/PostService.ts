import { NetworkService } from './NetworkService';
import { EndPoints } from './endpoints';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type ApiResponse<T> = T;

export class PostService {
    static async getPosts(): Promise<ApiResponse<Post[]>> {
        return await NetworkService.requestJson<Post[]>(EndPoints.posts.getPosts, {
            method: 'get',
        });
    }
}
