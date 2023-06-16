import { formatDistanceToNow } from 'date-fns';
import { BiMessageRounded } from 'react-icons/bi';
import { HiOutlineArrowPathRoundedSquare } from 'react-icons/hi2';
import { AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';
import { BiShare } from 'react-icons/bi';

const PostsComponent = ({ name, image, username, timestamp, text, userimage, likes, reposts }) => {
  const hasImage = !!image; // Check if post_image exists

  return (
    <div className="flex p-4 border-b border-gray-600 bg-black shadow-2xl max-w-screen rounded-lg">
      <div className="flex-shrink-0 mr-4">
        <Image
          src={userimage}
          alt="User Profile"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div className="flex-grow">
        <div className="flex gap-2">
          <h2 className="font-bold text-white truncate">{name}</h2>
          <p className="text-gray-500 overflow-truncate">@{username}</p>
          <p className="text-gray-500 text-sm">
            Posted {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
        <p className="mt-2 text-white">{text}</p>
        {hasImage && (
          <div className="mt-2 mb-4">
            <Image src={image} alt="Posted Image" width={300} height={100} />
          </div>
        )}
        
        <div className="flex justify-between text-white">
          <p className="gap-3 flex">
            <BiMessageRounded />
          </p>
          <p className="gap-3 flex">
            <HiOutlineArrowPathRoundedSquare />
            {reposts}
          </p>
          <p className="gap-3 flex">
            <AiOutlineHeart />
            {likes}
          </p>
          <p className="gap-3 flex">
            <BiShare />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostsComponent;
