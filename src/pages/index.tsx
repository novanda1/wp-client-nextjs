import { GetStaticProps, NextPage } from 'next';
import React, { useState } from 'react';
import tw from 'twin.macro';
import { Box, Button, Container, Intro, Layout, Page } from '../components';
import { PaginateProvider } from '../context/PaginateContext';
import { LastPostCursorDocument, PostsDocument, PostsQuery } from '../generated/graphql';
import { fetchData, fetcher } from '../utils/fetcher';
import { PreviewDataInterface } from './api/preview';

const initialLimit = 5;

interface HomeInterface {
    preview: boolean;
    initialData: PostsQuery;
    lastPostCursor: string;
    limit: number;
    previewData?: PreviewDataInterface;
}

const Home: NextPage<HomeInterface> = ({ preview, initialData, lastPostCursor }) => {
    const [cursor, setCursor] = useState('first');
    const [page, setPage] = useState(1);
    const pages = [<Page key={0} index={0} />];

    for (let i = 1; i < page; i++) {
        pages.push(<Page key={i} index={i} />);
    }

    const handlePagination = async () => {
        const newPage = page + 1;
        setPage(newPage);
    };

    console.log(`cursor`, cursor);
    console.log(`lastPostCursor`, lastPostCursor);

    return (
        <Layout preview={preview}>
            <Container>
                <Intro />

                <PaginateProvider
                    value={{
                        initialData,
                        initialLimit: initialLimit,
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

export default Home;

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
    const limit = initialLimit;

    const initialData = await fetchData({ query: PostsDocument, variables: { limit } });
    const lastPostCursorData = await fetcher({ query: LastPostCursorDocument });
    const lastPostCursor = lastPostCursorData.posts.edges[0].cursor;

    return {
        props: {
            preview: previewData?.preview || false,
            initialData,
            lastPostCursor,
        },
    };
};
