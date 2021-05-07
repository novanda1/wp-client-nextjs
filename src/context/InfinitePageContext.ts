import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

type InfinitePageContextType = {
    onLastCursor?: any;
    cursor?: string;
    lastCursor?: string;
};

const InfinitePageContext: React.Context<InfinitePageContextType> = React.createContext({});

export const InfinitePageProvider = InfinitePageContext.Provider;

export default InfinitePageContext;
