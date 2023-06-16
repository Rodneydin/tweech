"use client"
import{ useEffect, useState } from 'react';
import { client } from '../../sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/globals.css'; 

const CreatePostPage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const Profile = localStorage.getItem('Profile');
    if (Profile && Profile !== 'undefined') {
      const user = JSON.parse(Profile);
      setProfile(user);
    }
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID for the post
    const id = uuidv4();

    // Create the post document in Sanity
    const timestamp = new Date().toISOString(); // Get the current timestamp

    try {
      let imageUrl = null;
      if (image) {
        const imageAsset = await uploadImageToSanity(image);
        imageUrl = imageAsset ? imageAsset.url : null;
      }

      const post = {
        _type: 'post',
        id: id,
        text: text,
        image: imageUrl,
        timestamp: timestamp,
        likes_count: 0, // Initialize likes_count to 0
        reposts_count: 0, // Initialize reposts_count to 0
        postedBy: {
          _type: 'post',
          id: profile._id, // Replace with the user's ID from local storage
          name: profile.name, // Replace with the user's name from local storage
          username: profile.username, // Replace with the user's username from local storage
          followers_count: profile.followers_count, // Replace with the user's followers count from local storage
          image: profile.image, // Replace with the user's image from local storage
        },
      };

      await client.create(post);
      console.log('Post created successfully:', post);
      // Reset the text input and image state
      setText('');
      setImage(null);
      e.target.reset();
      return <p className="text-xl text-white">Post created successfully</p>;
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const uploadImageToSanity = async (file) => {
    const data = new FormData();
    data.append('file', file);

    try {
      const response = await client.assets.upload('image', data);
      const { _id, assetId, path, mimeType } = response;
      return { _type: 'image', _id, assetId, path, mimeType, url: URL.createObjectURL(file) }; // Return the complete image asset object
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container max-w-screen py-8 overflow-y-scroll text-white">
      <h1 className="text-3xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          rows={4}
          className="border border-gray-300 text-xl rounded p-2 mb-4 w-full mx-2 bg-slate-600"
        ></textarea>
        <label className="block mb-4">
          <span className="text-gray-700">Upload an Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
        </label>
        {image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
              className=" h-72 p-1 m-3"
            />
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold ml-4 py-2 px-4 rounded"
              onClick={handleImageDelete}
            >
              Delete
            </button>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 ml-4 text-white font-semibold py-2 px-4 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
