import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import HeroSection from './components/HeroSection';
import PostCard from '../../components/PostCard'
import CTASection from './components/CTASection';

import { get_posts } from '../../apis/post.api';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await get_posts()

            setPosts(response.data.posts);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <HeroSection />
            <div className='max-w-screen-2xl mx-auto p-3 flex flex-col gap-8 py-5'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-wrap justify-center gap-4'>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={'/search'}
                            className='text-lg text-teal-500 hover:underline text-center'
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>
            <CTASection />
        </>
    )
}

export default HomePage