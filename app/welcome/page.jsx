"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../redux/features/profileSlice';
import { client } from '../../sanity/lib/client';
import '../../styles/globals.css';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [interests, setInterests] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');
  const [notificationPref, setNotificationPref] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [greeting, setGreeting] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [updt, setUpdt] = useState(0); // Add a state variable to trigger fetchUserData

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, [updt]);

  const fetchUserData = async () => {
    try {
      const uid = user?.uid;
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
          country,
          interests,
          location,
          notificationPref,
          feedback
        }`,
        { uid }
      );

      dispatch(setProfile(response));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting;

    if (hour >= 5 && hour < 12) {
      newGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }

    setGreeting(newGreeting);
  }, []);

  useEffect(() => {
    setUsername(user?.name || '');
    setName(user?.name || '');
    setBio(user?.bio || 'My bio');
    setCountry(user?.country || '');
    setImage(user?.image || null);
    setInterests(user?.interests || '');
    setLocation(user?.location || '');
    setLanguage(user?.language || 'English');
    setNotificationPref(user?.notificationPref || true);
    setFeedback(user?.feedback || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { uid } = user;
      const updatedUser = {
        _type: 'user',
        _id: uid,
        username,
        name,
        bio,
        country,
        interests,
        location,
        notificationPref,
        feedback,
        followers_count: 0,
        following_count: 0,
        image: image || null, // Include the image in the updated user object
      };

      await client.createOrReplace(updatedUser);
      setUsername('');
      setName('');
      setBio('');
      setCountry('');
      setImage(null);
      setInterests('');
      setLocation('');
      setLanguage('');
      setNotificationPref(false);
      setFeedback('');

      setUpdt(updt + 1);
      router.push('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-8 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {name || 'Guest'}!</h1>
        <p className="text-lg">{greeting} to our website.</p>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="font-bold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="font-bold">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="font-bold">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="font-bold">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="font-bold">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Preview"
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="interests" className="font-bold">Interests</label>
            <input
              type="text"
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="font-bold">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="font-bold">Language</label>
            <input
              type="text"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notificationPref" className="font-bold">Notification Preferences</label>
            <input
              type="checkbox"
              id="notificationPref"
              checked={notificationPref}
              onChange={(e) => setNotificationPref(e.target.checked)}
              className="mr-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="feedback" className="font-bold">Feedback</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
