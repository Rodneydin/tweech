import { useRouter } from 'next/navigation';
import { FaEnvelope, FaApple } from 'react-icons/fa';
import { auth } from '../firebase/app';
import firebase from '../firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { client } from '../sanity/lib/client';
import { useEffect } from 'react';

import BgVideo from '../dist/BgVideo.mp4';

const LoginPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    if (!loading && user) {
      // User is already logged in, redirect to the home page
      router.push('/', { replace: true });
    }
  }, [user, loading, router]);

  const handleEmailLogin = async () => {
    // Email login logic
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      localStorage.setItem('user', JSON.stringify(user));

      const { displayName, uid, photoURL, email } = user;
   console.log(user)
      // Check if the user already exists in Sanity
      const existingUser = await client.fetch(`*[_type == "user" && _id == $uid]`, { uid });

      if (existingUser.length === 0) {
        // User does not exist in Sanity, create a new document
        const doc = {
          _id: uid,
          _type: 'user',
          email: email,
          username: displayName,
          name: displayName,
          followers_count: 0,
          following_count: 0,
          image: photoURL,
          tweets: [],
          bio: [],
          tweetContent: '',
          repliesContent: '',
          mediaContent: '',
          likesContent: '',
        };

        await client.create(doc);

        // Redirect new user to the welcome page
        router.push('/welcome', { replace: true });
      } else {
        // User exists in Sanity, redirect to the home page
        router.push('/', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppleLogin = async () => {
    // Apple login logic
  };

  return (
    <div className="relative min-h-screen bg-black/10">
      <div className="absolute w-full h-full">
        <video
          src={BgVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>
      <div className="absolute h-full w-full z-20 p-5 container">
        <h1 className="text-3xl font-bold mb-4">Login Page</h1>
        <div className="flex flex-col space-y-4 gap-4">
          <button
            className="bg-blue-500 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleEmailLogin}
          >
            <FaEnvelope className="mr-2 text-2xl" />
            Login with Email
          </button>
          <button
            className="bg-red-200 border z-5 shadow-lg hover:bg-red-300 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 text-2xl" />
            Login with Google
          </button>
          <button
            className="bg-black shadow-lg hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleAppleLogin}
          >
            <FaApple className="mr-2 text-2xl" />
            Login with Apple
          </button>
          <button
            className="bg-blue-500 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleAppleLogin}
          >
            <AiFillFacebook className="text-2xl text-bg-white mr-2" />
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
