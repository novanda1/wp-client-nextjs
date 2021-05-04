import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';
import { Box, Button, Container, Intro, Layout, Page } from '../components';
import { PaginateProvider } from '../context/PaginateContext';
import { LastPostCursorDocument, PostsDocument } from '../generated/graphql';
import { fetchData, fetcher } from '../utils/fetcher';

const initialLimit = 5;
const getLimit = (pageQuery: number) => {
    if (pageQuery <= 1) return initialLimit;
    else return pageQuery * 5 - 1;
};

const Home = ({ preview, initialData, lastPostCursor, limit }) => {
    const router = useRouter();
    const [realLimit, setRealLimit] = useState(limit);

    const [cursor, setCursor] = useState('first');
    const [page, setPage] = useState(1);
    const pages = [<Page key={0} index={0} />];

    for (let i = 1; i < page; i++) {
        pages.push(<Page key={i} index={i} />);
    }

    const handlePagination = async () => {
        const newPage = page + 1;

        await router.push(`/?page=${newPage}`, undefined, { shallow: true });
        setPage(newPage);
    };

    useEffect(() => {
        if (router.query.page) setRealLimit(getLimit(+router.query.page));
    }, [cursor]);

    return (
        <Layout preview={preview}>
            <Container>
                <Intro />

                <PaginateProvider
                    value={{
                        initialData,
                        initialLimit: realLimit,
                        limit: initialLimit - 1,
                        cursor,
                        onChangeCursor: (newCursor: string) => {
                            setCursor(newCursor);
                        },
                    }}
                >
                    {pages}
                </PaginateProvider>

                <Box tws={tw`mb-44 flex justify-center`}>
                    {cursor !== lastPostCursor && (
                        <Button
                            disabled={false}
                            tws={tw`hover:bg-accent-7 hover:text-white transition flex justify-center items-center py-2 px-6 font-medium text-lg border-accent-7 border-solid border rounded-sm`}
                            onClick={() => {
                                handlePagination();
                            }}
                        >
                            Load More Posts
                        </Button>
                    )}
                </Box>
            </Container>
        </Layout>
    );
};

Home.getInitialProps = async ({ req, previewData }) => {
    const pageQuery = req?.url?.split('page=')[1] || 0;
    const limit = getLimit(pageQuery) || 0;

    const initialData = await fetchData({ query: PostsDocument, variables: { limit } });
    const lastPostCursorData = await fetcher({ query: LastPostCursorDocument });
    const lastPostCursor = lastPostCursorData.posts.edges[0].cursor;

    return {
        preview: previewData?.preview || false,
        initialData,
        lastPostCursor,
        limit,
    };
};

export default Home;
