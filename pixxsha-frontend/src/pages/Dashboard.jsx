"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Twitter,
  Youtube,
  Package,
  Home,
  ShoppingCart,
  Users,
  LineChart,
  Bell,
  User,
  Menu,
  Tag,
  Folder,
  FolderOpen,
  XIcon,
  Trash2Icon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  deleteImage,
  deleteImagesByFolderId,
  getImageById,
  moveImageToFolder,
} from "../Features/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch } from "react-redux";
import { openPopup } from "../Features/popupslice";
import { useSelector } from "react-redux";
import ImageUploadPopup from "@/components/Upload";
import CreateTagDialog from "@/components/CreateTagDialog";
import CreateFolderDialog from "@/components/CreateFolderDialog";
import NavItems from "./NavItems";
import FolderContent from "@/components/FolderContent";
import { openfolderPopup } from "@/Features/Folderpopup";
import { deleteFolderaction, deleteTag } from "@/Features/Dialog";

export default function Component() {
  const [activeTab, setActiveTab] = useState("Home");
  const folders = useSelector((state) => state.folder.folders);
  const tags = useSelector((state) => state.tags.tags);
  const nfts = useSelector((state) => state.image.images);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // To store the clicked image for preview

  // Function to open image preview
  const handleImageClick = (nft) => {
    setPreviewImage(nft); // Set the clicked image for preview
  };

  // Function to close the preview
  const handleClosePreview = () => {
    setPreviewImage(null); // Reset the preview image state
  };
  const handleDeleteImage = (preview) => {
    console.log(preview);
    dispatch(deleteImage(preview.id));
    handleClosePreview(); // Close the preview modal after deletion
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = [];

    switch (activeTab) {
      case "Home":
        filtered = nfts.filter((nft) =>
          nft.metadata.name.toLowerCase().includes(lowerCaseQuery)
        );
        break;
      case "Folder":
        filtered = folders.filter(
          (folder) =>
            folder.name.toLowerCase().includes(lowerCaseQuery) ||
            folder.description.toLowerCase().includes(lowerCaseQuery)
        );
        break;
      case "Tags":
        filtered = tags.filter((tag) =>
          tag.name.toLowerCase().includes(lowerCaseQuery)
        );
        break;
      default:
        filtered = [];
    }

    setFilteredItems(filtered);
  }, [searchQuery, activeTab, folders, tags, nfts]);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  const handleNftSelection = (nftId) => {
    setSelectedNfts((prev) =>
      prev.includes(nftId)
        ? prev.filter((id) => id !== nftId)
        : [...prev, nftId]
    );
  };
  const Folderdetails = (folderid, FolderName) => {
    // console.log(folderid);
    setSelectedFolderId(folderid);
    setSelectedFolderName(FolderName);
    dispatch(openfolderPopup());
  };

  const deleteFolder = async (folderId) => {
    console.log(folderId);
    dispatch(deleteImagesByFolderId(folderId));
    dispatch(deleteFolderaction(folderId));
    toast.success(`Folder Deleted Successfully`);
  };
  const handleDeleteTag = async (tagId) => {
    console.log(tagId);
    // setPreviewImage((prev) => ({
    //   ...prev,
    //   tags: prev.tags.filter((tag) => tag.id === tagId), // Filter out the deleted tag
    // }));
    dispatch(deleteTag(tagId));
  };
  const handleMoveImage = (newFolderId) => {
    if (newFolderId) {
      console.log(previewImage.id);
      dispatch(
        moveImageToFolder({ imageId: previewImage.id, folderId: newFolderId })
      );
      toast.success(`Moved image to folder: ${newFolderId}`);
    }
  };
  const renderContent = () => {
    const itemsToRender = searchQuery
      ? filteredItems
      : activeTab === "Home"
      ? nfts
      : activeTab === "Folder"
      ? folders
      : activeTab === "Tags"
      ? tags
      : [];
    switch (activeTab) {
      case "Home":
        return (
          <div>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {itemsToRender.length === 0 ? (
                  <div className="col-span-2 md:col-span-4 text-center p-4">
                    <p className="text-lg font-semibold">No image exists</p>
                  </div>
                ) : (
                  itemsToRender.map((nft) => (
                    <Card
                      key={nft.id}
                      className="rounded-none border shadow-sm relative"
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square relative">
                          <img
                            alt={`NFT ${nft.id}`}
                            src={nft.url}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => handleImageClick(nft)} // Open preview on click
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium">
                            {nft.metadata.name}
                          </p>
                          {nft.name && (
                            <p className="text-xs text-gray-500">
                              {nft.metadata.name}
                            </p>
                          )}
                        </div>

                        {/* Delete button on image card */}

                        {/* Tag Display */}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              {/* Image Preview Modal */}

              {previewImage && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/75">
                  <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full">
                    <Button
                      className="absolute top-2 right-2"
                      variant="outline"
                      size="icon"
                      onClick={handleClosePreview}
                    >
                      <XIcon className="w-5 h-5" />
                    </Button>
                    <img
                      src={previewImage.url}
                      alt={previewImage.name || `NFT ${previewImage.id}`}
                      className="w-full h-auto"
                    />
                    <div className="mt-4">
                      <p className="text-lg font-bold">
                        {previewImage.metadata.name || ` ${previewImage.id}`}
                      </p>
                      {previewImage.tags && (
                        <div className="flex items-center space-x-2 mt-2">
                          {previewImage.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md"
                            >
                              {tag.name}
                              <Button
                                className="ml-2"
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteTag(tag.id)} // Call deleteTag
                              >
                                <Trash2Icon className="w-4 h-4" />
                              </Button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Move Image Dropdown */}
                    <div className="mt-4">
                      <label
                        htmlFor="move-image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Move to Folder:
                      </label>
                      <select
                        id="move-image"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        onChange={(e) => handleMoveImage(e.target.value)}
                      >
                        <option value="">Select a folder</option>
                        {folders.map((folder) => (
                          <option key={folder.id} value={folder.id}>
                            {folder.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete button in the preview modal */}
                    <Button
                      onClick={() => handleDeleteImage(previewImage)} // Delete action
                      variant="destructive"
                      className="mt-4"
                    >
                      <Trash2Icon className="w-4 h-4 mr-1" />
                      Delete Image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "Folder":
        return (
          <div className="text-center">
            {itemsToRender.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Folder className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-4">No folders found</h2>
                <p className="text-gray-500 mb-4">
                  Create a folder to organize your Memories
                </p>
                <CreateFolderDialog />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {itemsToRender.map((folder, index) => (
                  <Card
                    key={index}
                    className="rounded-none border shadow-sm flex flex-col items-center"
                  >
                    <CardContent className="p-4 flex-grow">
                      <Folder className="h-8 w-8 text-gray-500 mb-2" />
                      <h3 className="font-semibold">{folder.name}</h3>
                      <p className="text-sm text-gray-500">
                        {folder.description}
                      </p>
                    </CardContent>
                    <div className="flex justify-between p-2 w-full">
                      <button
                        onClick={() => Folderdetails(folder.id, folder.name)}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteFolder(folder.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </Card>
                ))}
                <Card className="rounded-none border shadow-sm flex items-center justify-center">
                  <CreateFolderDialog />
                </Card>
              </div>
            )}
          </div>
        );
      case "Tags":
        return (
          <div className="text-center">
            {itemsToRender.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Tag className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-4">No tags found</h2>
                <p className="text-gray-500 mb-4">
                  Create a tag to categorize your Memories
                </p>
                <CreateTagDialog />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {itemsToRender.map((tag, index) => (
                  <Card
                    key={index}
                    className="rounded-none border shadow-sm flex flex-col"
                  >
                    <CardContent className="p-4">
                      <Tag className="h-8 w-8 text-gray-500 mb-2" />
                      <h3 className="font-semibold">{tag.name}</h3>
                      <p className="text-sm text-gray-500">{tag.description}</p>
                    </CardContent>
                    <div className="flex justify-between p-2 w-full">
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </Card>
                ))}
                <Card className="rounded-none border shadow-sm flex items-center justify-center">
                  <CreateTagDialog />
                </Card>
              </div>
            )}
          </div>
        );
      case "About Us":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p>Browse and purchase the latest OATS NFT collections.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.popup);
  const { folderdetailsOpen } = useSelector((state) => state.folderpopup);
  const handleOpenPopup = () => {
    dispatch(openPopup());
  };
  return (
    <div>
      <Toaster position="top-right" className="fixed z-50" />
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        {isOpen && <ImageUploadPopup />}
        {folderdetailsOpen && (
          <FolderContent
            folderId={selectedFolderId}
            foldername={selectedFolderName}
          />
        )}

        <div className="hidden border-r bg-gray-100/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Package className="h-6 w-6" />
                <span className="">Pixxsha</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid  px-4 text-sm font-medium">
                <NavItems setActiveTab={setActiveTab} activeTab={activeTab} />
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full rounded-none">Upgrade</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:hidden rounded-none"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[385px]">
                <nav className="grid gap-4 py-4">
                  <NavItems setActiveTab={setActiveTab} activeTab={activeTab} />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <Link href="#">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#">
                <Youtube className="h-5 w-5" />
              </Link>
              <Button
                className="rounded-none"
                size="sm"
                onClick={handleOpenPopup}
              >
                Upload Images
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-x-2">
                <Button className="rounded-none">OATS</Button>
                <Button variant="outline" className="rounded-none">
                  BEANZ
                </Button>
              </div>
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    className="pl-8 rounded-none"
                    placeholder="Search by name..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="rounded-none"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
