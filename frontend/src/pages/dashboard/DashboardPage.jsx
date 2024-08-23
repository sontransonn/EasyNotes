import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import DashSidebar from './components/DashSidebar';
import ProfileTab from './components/ProfileTab';
import PostsTab from './components/PostsTab';
import DashUsers from './components/DashUsers';
import DashComments from './components/DashComments';
import DashboardComp from './components/DashboardComp';

const DashboardPage = () => {
    const location = useLocation();

    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* Sidebar */}
                <DashSidebar />
            </div>
            {/* profile... */}
            {tab === 'profile' && <ProfileTab />}
            {/* posts... */}
            {tab === 'posts' && <PostsTab />}
            {/* users */}
            {tab === 'users' && <DashUsers />}
            {/* comments  */}
            {tab === 'comments' && <DashComments />}
            {/* dashboard comp */}
            {tab === 'dash' && <DashboardComp />}
        </div>
    )
}

export default DashboardPage