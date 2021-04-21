import polly from 'polly-js'
import { GraphQLClient } from 'graphql-request'
import { API_URL } from './constants'
import { RequestDocument } from 'graphql-request/dist/types'
import Router from 'next/router'

import Cookies from 'js-cookie'
import { getSdk } from '../lib/generated/graphql'
import useSWR from 'swr'
import { useMemo } from 'react'

interface FetcherArgs {
    query: RequestDocument
    variables?: object
    isUseToken?: boolean
}

const COOKIES_TOKEN_NAME = 'wpt'
const retrieveToken = () => Cookies.get(COOKIES_TOKEN_NAME)
const setToken = (token) => Cookies.set(COOKIES_TOKEN_NAME, token)
const clearToken = () => Cookies.remove(COOKIES_TOKEN_NAME)

const refreshToken = async () => {
    const sdk = getSdk(client)
    client.setHeader('Authorization', '')

    const res = await sdk.getToken({
        password: 'admin',
        username: 'admin',
    })

    setToken(res.login.authToken)
}

const client = new GraphQLClient(API_URL)

export const fetcher = async (args: FetcherArgs) => {
    if (args.isUseToken)
        client.setHeader('Authorization', `Bearer ${retrieveToken()}`)
    const data = await client
        .request(args.query, args.variables)
        .catch((err) => err)

    return data
}

export const fetchData = async (args: FetcherArgs) => {
    const data = await new Promise<any>(async (resolve, reject) => {
        let res = () =>
            fetcher(args).then(async (response) => {
                if (response?.response)
                    if ('errors' in response.response) {
                        await refreshToken()
                        // Router.reload()
                    }

                resolve(response)
                return response
            })
        res()
    })

    return data
}

export const fetchSWR = (args: FetcherArgs) => {
    const params = useMemo(() => args, [])
    const { data, error } = useSWR([params], fetchData)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    }
}
