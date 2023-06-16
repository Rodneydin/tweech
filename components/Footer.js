"use client"
import Link from "next/link";
import { usePathname} from "next/navigation";
import { useState } from "react";
import { BsMessenger } from "react-icons/bs";
import { HiHome, HiPlus, HiSearch } from "react-icons/hi";
import { useSelector } from 'react-redux';


function Footer() {
  const currentPath = usePathname()
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isNewMessage, setIsNewMessage] = useState(false);
    
  const {user} = useSelector((state) => state.user);

  const receiveNewMessage = () => {
    if (currentPath !== '/messages') {
      setIsNewMessage(true);
      // Reset isNewMessage after 2 seconds
      setTimeout(() => {
        setIsNewMessage(false);
      }, 2000);
    }
  };

  return (
    <>
      {currentPath !== '/Login' && (
        <div className="fixed bottom-0 overflow-hidden left-0 right-0 flex justify-around bg-white p-4 shadow-md">
          <Link href="/" className="flex flex-col items-center">
             
              <HiHome className="text-2xl text-gray-500" />
              <span className="text-xs">Home</span>
            
          </Link>
          <Link href="/search"className="flex flex-col items-center">
             
              <HiSearch className="text-2xl text-gray-500" />
              <span className="text-xs">Search</span>
            
          </Link>
          <Link href='/createpost'className="flex flex-col items-center"> 
            <HiPlus className="text-2xl text-gray-500" />
            <span className="text-xs">Add</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center relative">
            
              <BsMessenger className="text-2xl text-gray-500" />
              {isNewMessage && currentPath !== '/messages' && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
              )}
              <span className="text-xs">Messages</span>
            
          </Link>
          {user && (
            <Link href="/Profile" className="flex flex-col items-center">
              
                <img
                  src={user.photoURL}
                  className="rounded-full h-auto w-8"
                  alt="User Avatar"
                />
                <span className="text-xs">You</span>
              
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Footer;
