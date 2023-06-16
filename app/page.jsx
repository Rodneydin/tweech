"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { client } from '../sanity/lib/client';
import '../styles/globals.css';
import Logo from '../dist/logo.png'
import PostsComponent from '../components/Post';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  useEffect(() => {
    if (!user) {
      // Redirect the user to the login page if user is undefined
      router.push('/Login');
    } else {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await client.fetch(
        `*[_type == "post"] | order(_createdAt desc) {
          _id,
          text,
          image,
          timestamp,
          reposts_count,
          likes_count,
          postedBy,
        }`
      );

      setData(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen mb-26" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <Image
        src={Logo}
        alt='tweecher logo'
        className='bg=transparent h-20 w-auto'
      />

      <div className="space-y-4 max-h-screen overflow-y-auto">
        {data?.map((post) => (
          <PostsComponent
            key={post._id}
            text={post.text}
            image={post?.image}
            timestamp={post?.timestamp}
            name={post.postedBy?.name}
            username={post.postedBy?.username}
            userimage={post.postedBy?.image}
            userid={post.postedBy?._id}
            reposts={post?.reposts_count}
            likes={post?.likes_count}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
