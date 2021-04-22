import { RequestDocument, Variables } from 'graphql-request/dist/types';

export type FetcherArgs = {
    query: RequestDocumentcument;
    variables?: Variablesables;
    isUseToken?: boolean;
    initialData?: any;
};
