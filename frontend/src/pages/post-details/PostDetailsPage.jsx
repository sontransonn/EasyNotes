import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';

import PostCard from './components/PostCard';
import CommentSection from './components/CommentSection';
import CallToAction from './components/CallToAction';

import { get_post_by_postSlug, get_recent_posts_with_limit } from "../../apis/post.api"

const PostDetailsPage = () => {
    const { postSlug } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await get_post_by_postSlug(postSlug)

                if (response.statusText !== "OK") {
                    setError(true);
                    setLoading(false);
                    return;
                }

                if (response.statusText == "OK") {
                    setPost(response.data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const response = await get_recent_posts_with_limit(3);

                if (response.statusText == "OK") {
                    setRecentPosts(response.data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    if (loading)
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <Link
                to={`/search?category=${post && post.category}`}
                className='self-center mt-5'
            >
                <Button color='gray' pill size='xs'>
                    {post && post.category}
                </Button>
            </Link>
            <img
                src={post && post.image}
                alt={post && post.title}
                className='mt-10 p-3 max-h-[600px] w-full object-cover'
            />
            <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-3 max-w-2xl mx-auto w-full post-content'
                dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></div>
            <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div>
            <CommentSection postId={post._id} />

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
        </main>
    )
}

export default PostDetailsPage