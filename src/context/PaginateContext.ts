import React from 'react';
import { PostsQuery } from '../generated/graphql';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

type PaginateContextType = {
    initialData?: PostsQuery;
    limit?: number;
    onChangeCursor?: any;
    cursor?: string;
};

const PaginateContext: React.Context<PaginateContextType> = React.createContext({});

export const PaginateProvider = PaginateContext.Provider;

export default PaginateContext;
