import { RequestDocument, Variables } from 'graphql-request/dist/types';

export type FetcherArgs = {
    query: RequestDocument;
    variables?: Variables;
    isUseToken?: boolean;
    initialData?: any;
};
