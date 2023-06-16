import Image from 'next/image';
import { HiArrowUpTray } from "react-icons/hi2";
import { HiOutlineArrowPathRoundedSquare } from "react-icons/hi2";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { formatDistanceToNow } from 'date-fns';
import '../styles/globals.css'


const UserComponent = ({ user }) => {
  return (
      <>
    <div className="flex p-4 border-b border-gray-600 bg-black shadow-2xl rounded-lg">
      <div className="flex-shrink-0 mr-4">
        <Image
          src={user.image}
          alt={`Profile picture of ${user.username}`}
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className='flex gap-2'>
            <h2 className="font-bold text-white">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-500 text-sm">
                Posted {formatDistanceToNow(new Date(user.tweets[0].timestamp), { addSuffix: true })}
            </p>

        </div>
        <p className="mt-2 text-white">{user.tweets[0].text}</p>
   <div className='flex justify-between text-white '>
        <p className='gap-3 flex '><BiMessageRounded/></p>
        <p className='gap-3 flex '><HiOutlineArrowPathRoundedSquare />{user.tweets[0].retweets_count}</p>
        <p className='gap-3 flex '><AiOutlineHeart/>{user.tweets[0].likes_count}</p>
        <p className='gap-3 flex '><HiArrowUpTray/></p>
   </div>
      </div>

    </div>
    
</>
  );
};

export default UserComponent;
