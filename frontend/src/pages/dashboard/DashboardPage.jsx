import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import TabBar from './components/TabBar';
import OverviewTab from './components/OverviewTab';
import ProfileTab from './components/ProfileTab';
import PostsTab from './components/PostsTab';
import UsersTab from './components/UsersTab';
import CommentsTab from './components/CommentsTab';

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
                <TabBar />
            </div>
            {/* dashboard comp */}
            {tab === 'dash' && <OverviewTab />}
            {/* profile... */}
            {tab === 'profile' && <ProfileTab />}
            {/* posts... */}
            {tab === 'posts' && <PostsTab />}
            {/* users */}
            {tab === 'users' && <UsersTab />}
            {/* comments  */}
            {tab === 'comments' && <CommentsTab />}
        </div>
    )
}

export default DashboardPage