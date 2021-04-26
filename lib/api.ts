import { GraphQLClient } from 'graphql-request';
import Cookies from 'js-cookie';
import Router from 'next/router';
import useSWR from 'swr';
import { getSdk, UserExpiredTokenDocument, UserNodeIdTypeEnum } from '../lib/generated/graphql';
import { API_URL, API_USERNAME, COOKIES_TOKEN_NAME } from './constants';
import { FetcherArgs } from './types/FetchArgs';
import { isServer } from './utils/isServer';

export const retrieveToken = () => Cookies.get(COOKIES_TOKEN_NAME);
const setToken = (token) => Cookies.set(COOKIES_TOKEN_NAME, token);
// const clearToken = () => Cookies.remove(COOKIES_TOKEN_NAME);

const client = new GraphQLClient(API_URL);
const sdk = getSdk(client);

export const refreshToken = async () => {
    client.setHeader('Authorization', '');

    const res = await sdk.getToken({
        password: 'admin',
        username: 'admin',
    });

    setToken(res.login.authToken);

    return res.login.authToken;
};

export const fetcher = async (args: FetcherArgs) => {
    if (args.isUseToken) client.setHeader('Authorization', `Bearer ${retrieveToken()}`);
    const data = await client.request(args.query, args.variables).catch((err) => err);

    return data;
};

export const fetchData = async (args: FetcherArgs) => {
    const data = await new Promise<any>(async (resolve) => {
        const res = () =>
            fetcher(args).then(async (response) => {
                if (response?.response)
                    if ('errors' in response.response) {
                        await refreshToken();
                        Router.reload();
                    }

                resolve(response);
                return response;
            });
        res();
    });

    return data;
};

export const fetchSWR = (key: any, args: FetcherArgs) => {
    if (args.isUseToken) {
        client.setHeader('Authorization', `Bearer ${retrieveToken()}`);
    }
    // const options: Configuration = {
    const options: any = {
        revalidateOnMount: true,
        onError: () => {
            refreshToken();
        },
        isPaused: () => isServer,
    };

    if (args.initialData) {
        options.initialData = args.initialData;
    }

    const queryAndVariables = {
        query: args.query,
        variables: args.variables,
    };

    const { data, error } = useSWR([key], () => fetcher(queryAndVariables), options);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const fetchStatic = async (args: FetcherArgs, token: string) => {
    /**
     * this fetch method called after
     * access /api page
     * and already have token
     */
    if (args.isUseToken) {
        client.setHeader('Authorization', `Bearer ${token}`);

        const exp = await client.request(UserExpiredTokenDocument, {
            id: API_USERNAME,
            idType: UserNodeIdTypeEnum.Username,
        });
        const expDate = exp.user?.jwtAuthExpiration;

        if (Date.now() == expDate * 1000) {
            await refreshToken();
            client.setHeader('Authorization', `Bearer ${retrieveToken()}`);
        }
    }

    const data = await client.request(args.query, args.variables);

    return data;
};
