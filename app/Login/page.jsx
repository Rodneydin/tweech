"use client"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { FaEnvelope, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { client } from '../../sanity/lib/client';
import BgVideo from '../../dist/BgVideo.mp4';
import { setUser } from '../../redux/features/userSlice.ts';
import {auth} from '../../firebase/app'

import {useAuthState} from 'react-firebase-hooks/auth'

const LoginPage = () => {
  const [user, loading] = useAuthState(auth)
  const googleProvider =new GoogleAuthProvider ();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailLogin = async () => {
    // Email login logic
  };

  const handleGoogleLogin = async (result) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);;
      const { user } = result;

      
      console.log(user);
      //console.log(uid);
      const { displayName, uid, photoURL, email } = user;

    dispatch(
      setUser({
        uid,
        displayName,
        photoURL,
        email,
      })
    );
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
        client.createIfNotExists(doc)
        .then(() => {
          router.push('/welcome', { replace: true });
        });
        
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAppleLogin = async () => {
    // Apple login logic
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-black/20">
      <div className="w-full h-full fixed object-cover top-0 bottom-0 right-0 left-0">
        <video
          src={BgVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay
          muted
          className="w-full h-full fixed object-cover top-0 bottom-0 right-0 left-0"
        />
      </div>
      <div className="h-full w-full z-20 p-5  top-0 bottom-0 right-0 left-0 absolute bg-black/30">
        <h1 className="text-3xl font-bold mb-4">Login Page</h1>
        <div className="flex flex-col space-y-4 gap-4">
          <button
            className="bg-white  shadow-lg hover:bg-blue-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
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
            className="bg-blue-500 shadow-xl z-20  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={handleGoBack}
          >
            <AiFillFacebook className="text-2xl text-bg-white mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
