import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Modal, Table, Button } from 'flowbite-react';
import toast from "react-hot-toast"

import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { get_all_users, delete_user_by_userId } from '../../../apis/user.api';

const UsersTab = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get_all_users()

                setUsers(response.data.users);
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            const response = await delete_user_by_userId(userIdToDelete)

            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            toast.success("User deleted successfully!")
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Date created</Table.HeadCell>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>

                    {users.map((user) => (
                        <Table.Body className='divide-y' key={user._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <img
                                        src={user.profilePicture}
                                        alt={user.username}
                                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                                    />
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>
                                    {user.isAdmin ? (
                                        <FaCheck className='text-green-500' />
                                    ) : (
                                        <FaTimes className='text-red-500' />
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                            setUserIdToDelete(user._id);
                                        }}
                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>

            ) : (
                <p>You have no users yet!</p>
            )}

            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this user?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
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

export default UsersTab