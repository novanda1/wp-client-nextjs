import { fetcher } from '../../lib/api';
import { getSdk, GetTokenDocument, PostIdType, PreviewPostDocument } from '../../lib/generated/graphql';
import { WORDPRESS_PREVIEW_SECRET,COOKIES_TOKEN_NAME, API_URL } from '../../lib/constants';
import { GraphQLClient } from 'graphql-request'

export default async function preview(req, res) {
    const { secret, id, slug } = req.query;

    // Check the secret and next parameters
    // This secret should only be known by this API route
    if (!WORDPRESS_PREVIEW_SECRET || secret !== WORDPRESS_PREVIEW_SECRET || (!id && !slug)) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // settoken
    const client = new GraphQLClient(API_URL)
    const sdk = getSdk(client)
    const getToken = await fetcher({query: GetTokenDocument, variables:{username: 'admin', password: 'admin'}})
    client.setHeader('Authorization', `Bearer ${getToken.login.authToken}`)
    // res.setHeader('Set-Cookie', serialize(COOKIES_TOKEN_NAME, getToken.login.authToken, { path: '/' }));

    // Fetch WordPress to check if the provided `id` or `slug` exists
    const variables: {id: string, idType: PostIdType} = { id: id || slug, idType: id ? PostIdType.DatabaseId : PostIdType.Slug };
    const {post} = await sdk.PreviewPost(variables) 
    // fetchData({ query: PreviewPostDocument, variables, isUseToken: true });

    // If the post doesn't exist prevent preview mode from being enabled
    if (!post) {
        return res.status(401).json({ message: 'Post not found' });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        post: {
            id: post.databaseId,
            slug: post.slug,
            status: post.status,
        },
        token: getToken.login?.authToken
    });

    // Redirect to the path from the fetched post
    // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
    res.writeHead(307, { Location: `/posts/${post.slug || post.databaseId}` });
    res.end();
}
