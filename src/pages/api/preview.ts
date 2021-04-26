import { GraphQLClient } from 'graphql-request';
import { fetcher } from '../../utils/fetcher';
import { API_URL, COOKIES_TOKEN_NAME, WORDPRESS_PREVIEW_SECRET } from '../../constants';
import { getSdk, GetTokenDocument, PostIdType } from '../../generated/graphql';
import Cookies from 'cookies';

export default async function preview(req, res) {
    const { secret, id, slug } = req.query;
    const cookies = new Cookies(req, res);

    // Check the secret and next parameters
    // This secret should only be known by this API route
    if (!WORDPRESS_PREVIEW_SECRET || secret !== WORDPRESS_PREVIEW_SECRET || (!id && !slug)) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // settoken
    const client = new GraphQLClient(API_URL);
    const sdk = getSdk(client);
    const getToken = await fetcher({ query: GetTokenDocument, variables: { username: 'admin', password: 'admin' } });
    await cookies.set(COOKIES_TOKEN_NAME);
    await cookies.set(COOKIES_TOKEN_NAME, getToken.login.authToken, {
        overwrite: true,
    });
    client.setHeader('Authorization', `Bearer ${cookies.get(COOKIES_TOKEN_NAME)}`);
    // res.setHeader('Set-Cookie', serialize(COOKIES_TOKEN_NAME, getToken.login.authToken, { path: '/' }));

    // Fetch WordPress to check if the provided `id` or `slug` exists
    const variables: { id: string; idType: PostIdType } = {
        id: id || slug,
        idType: id ? PostIdType.DatabaseId : PostIdType.Slug,
    };
    const { post } = await sdk.PreviewPost(variables);
    // fetchData({ query: PreviewPostDocument, variables, isUseToken: true });

    // If the post doesn't exist prevent preview mode from being enabled
    if (!post) {
        return res.status(401).json({ message: 'Post not found' });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData(
        {
            post: {
                id: post.databaseId,
                slug: post.slug,
                status: post.status,
            },
            token: cookies.get(COOKIES_TOKEN_NAME),
        },
        {
            /**
             * specify preview mode duration by wp graphql jwt token life
             * by default is 5 minutes
             *
             * https://github.com/wp-graphql/wp-graphql-jwt-authentication#change-auth-token-expiration
             * https://nextjs.org/docs/advanced-features/preview-mode#specify-the-preview-mode-duration
             */
            maxAge: 60 * 5, // 5 minutes
        },
    );

    // Redirect to the path from the fetched post
    // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/post/${post.slug || post.databaseId}` });
    res.end();
}
