import { AuthorFieldsFragment } from '../generated/graphql';

export type SinglePostType = {
    title: string;
    coverImage: any;
    date: string;
    excerpt?: string;
    author: AuthorFieldsFragment;
    slug?: string;
    categories?: any;
};
