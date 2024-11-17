import { Pasta } from "./Pasta";
import { Post } from "./Post";

export interface PostPasta {
    postid?: number;
    pastaid: number;
    pasta?: Pasta;
    post?: Post;
}