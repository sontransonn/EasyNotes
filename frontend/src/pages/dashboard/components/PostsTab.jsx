import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Table, Button } from 'flowbite-react';
import toast from "react-hot-toast"

import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { get_all_posts, delete_post_by_postId } from '../../../apis/post.api';

const PostsTab = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [userPosts, setUserPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await get_all_posts(currentUser._id)

                setUserPosts(response.data.posts);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        };

        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const response = await delete_post_by_postId(postIdToDelete, currentUser._id)

            toast.success("Post deleted successfully!")
            setUserPosts((prev) =>
                prev.filter((post) => post._id !== postIdToDelete)
            );
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date updated</Table.HeadCell>
                        <Table.HeadCell>Post image</Table.HeadCell>
                        <Table.HeadCell>Post title</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                        <Table.HeadCell>
                            <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>

                    {userPosts.map((post) => (
                        <Table.Body className='divide-y'>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(post.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className='w-20 h-10 object-cover bg-gray-500'
                                        />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        className='font-medium text-gray-900 dark:text-white'
                                        to={`/post/${post.slug}`}
                                    >
                                        {post.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{post.category}</Table.Cell>
                                <Table.Cell>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }}
                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        className='text-teal-500 hover:underline'
                                        to={`/update-post/${post._id}`}
                                    >
                                        <span>Edit</span>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            ) : (
                <p>You have no posts yet!</p>
            )}

            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default PostsTab