import React from "react";
import Link from "next/link";
import { HiOutlineUser, HiOutlineChat, HiX } from "react-icons/hi";
import { CiViewList } from "react-icons/ci";
import { BsBookmark, BsLightning } from "react-icons/bs";

const Sidebar = ({ onClose }) => {
  const sidebarItems = [
    { text: "Home", icon: null, path: "/" },
    { text: "Profile", icon: <HiOutlineUser />, path: "/Profile" },
    { text: "Lists", icon: <CiViewList />, path: "/Lists" },
    { text: "Topics", icon: <HiOutlineChat />, path: "/Topics" },
    { text: "Bookmarks", icon: <BsBookmark />, path: "/Bookmarks" },
    { text: "Moments", icon: <BsLightning />, path: "/Moments" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white">
      <div className="flex justify-between items-center py-4 px-6">
        <h2 className="text-lg font-bold">Sidebar</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <HiX size={20} />
        </button>
      </div>
      <ul className="flex flex-col flex-grow py-4">
        {sidebarItems.map((item, index) => (
          <li key={index} className="px-6 py-2 flex items-center">
            <Link href={item.path } legacyBehavior>
              <a className="flex items-center text-xl">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mx-3 gap-4 text-lg my-10">
        <li>
          <Link href="/Settings" legacyBehavior>
            <a>Settings and privacy</a>
          </Link>
        </li>
        <li>
          <Link href="/Help" legacyBehavior>
            <a>Help Center</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
