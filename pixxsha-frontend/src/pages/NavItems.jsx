import React from "react"; // Ensure React is imported
import { Home, FolderOpen, Tag, Users } from "lucide-react"; // Update this import according to your icon library

const NavItems = ({ setActiveTab, activeTab, onClick = () => {} }) => (
  <>
    {["Home", "Folder", "Tags", "About Us"].map((item) => (
      <button
        key={item}
        className={`flex items-center gap-3 rounded-none px-3 py-2 transition-all ${
          activeTab === item
            ? "bg-gray-200 text-gray-900"
            : "text-gray-500 hover:text-gray-900"
        }`}
        onClick={() => {
          setActiveTab(item);
          onClick();
        }}
      >
        {item === "Home" && <Home className="h-4 w-4" />}
        {item === "Folder" && <FolderOpen className="h-4 w-4" />}
        {item === "Tags" && <Tag className="h-4 w-4" />}
        {item === "About Us" && <Users className="h-4 w-4" />}
        {item}
      </button>
    ))}
  </>
);

export default NavItems;
