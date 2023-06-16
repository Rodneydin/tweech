'use client'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaUser,
  FaUsers,
  FaComment,
  FaHeart,
  FaRetweet,
  FaInbox,
} from 'react-icons/fa';
import { client } from '../../sanity/lib/client';
import '../../styles/globals.css';
import { setProfile } from '../../redux/features/profileSlice';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const router=useRouter()
console.log(user)
  const fetchUserData = async () => {
    try {
      const uid = profile?.uid;
      if (!uid) return;

      const response = await client.fetch(
        `*[_type == "user" && _id == $uid][0] {
          name,
          _id,
          username,
          image,
          bio,
          followers_count,
          following_count,
          posts,
          reposts,
          directMessages,
          menuItems[],
        }`,
        { uid }
      );

      localStorage.setItem('Profile', JSON.stringify(response));

      dispatch(setProfile(response));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  ;

  useEffect(() => {
    fetchUserData()
  }, [profile?.uid]);

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    switch (index) {
      case 0:
        console.log(profile.posts);
        break;
      case 1:
        console.log(profile.reposts);
        break;
      case 2:
        console.log(profile.directMessages);
        break;
      default:
        break;
    }
  };

  const handleEditProfile = () => {
   router.push('/welcome')
  };
  const menuItems = [
  {
    label: "Posts",
    content: profile.posts,
  },
  {
    label: "Reposts",
    content: profile.reposts,
  },
  {
    label: "Direct Messages",
    content: profile.directMessages,
  },
];


  const handleSaveProfile = async (updatedProfile) => {
    try {
      // Save the updated profile to the Redux store and Sanity
      // Dispatch an action to update the profile in the Redux store
      dispatch(
        setProfile({
          ...profile,
          name: updatedProfile.name,
          username: updatedProfile.username,
          bio: updatedProfile.bio.text,
        })
      );

      // Save the updated profile to Sanity using the client.patch method
      await client
        .patch(profile?.uid)
        .set({
          name: updatedProfile.name,
          username: updatedProfile.username,
          bio: updatedProfile.bio.text,
        })
        .commit();

    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  
  return (
    <div className="min-h-screen text-white container mx-auto px-4 py-8">
      {user && (
        <div className="relative">
          <img
            className="w-full h-370 2xl:h-510 object-cover rounded-lg shadow-lg"
            src="https://source.unsplash.com/1600x900/?nature,photography,technology"
            alt="user-pic"
          />
          <div className="absolute left-0 right-0 bottom-0 p-4 flex items-center justify-between bg-black/10">
            <img
              src={user.image}
              alt="Profile-picture"
              className="rounded-full w-10 h-10 cursor-pointer"
            />
            
              <button
                className="px-4 py-2 bg-gradient-to-br from-blue-600 to-pink-600 text-white rounded-lg"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            
          </div>
        </div>
      )}

      {user && (
        <div className="relative bg-black/10 p-5 mt-4">
         
            <>
              <h1 className="text-lg font-bold mb-2">{user.name}</h1>
              <span className="text-gray-500">@{user.username}</span>
              <div className="border border-gray-300 rounded p-4 mb-4">
                <div className="mb-2">
                  <p className="font-bold">{user?.bio?.text}</p>
                  <span>{user?.bio?.views} views</span>
                </div>
              </div>
            </>
          
        </div>
      )}

      {user && (
        <div className="mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-gray-600" />
              <span>{user.followers_count}</span>
              <span>Followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span>{user.following_count}</span>
              <span>Following</span>
            </div>
          </div>

          <ul className="flex justify-between font-bold">
            {menuItems?.map((item, index) => (
              <li
                key={index}
                className={`hover:underline cursor-pointer ${
                  activeButtonIndex === index ? 'underline' : ''
                }`}
              >
                <button
                  className="relative group"
                  onClick={() => handleButtonClick(index)}
                >
                  {item.label}
                  {item.newMessage && currentPath !== '/messages' && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  )}
                  {item.newMessage && currentPath === '/messages' && (
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {menuItems?.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded p-4 mb-4 ${
                activeButtonIndex === index ? '' : 'hidden'
              }`}
            >
              {item.content.map((content, contentIndex) => (
                <div key={contentIndex} className="mb-4">
                  <p>{content.text}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <FaComment className="text-gray-600" />
                      <span>{content.replies.length}</span>
                      <span>Replies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaHeart className="text-gray-600" />
                      <span>{content.likes_count}</span>
                      <span>Likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaRetweet className="text-gray-600" />
                      <span>{content.retweets_count}</span>
                      <span>Retweets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaInbox className="text-gray-600" />
                      <span>{content.dm_count}</span>
                      <span>DMs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
