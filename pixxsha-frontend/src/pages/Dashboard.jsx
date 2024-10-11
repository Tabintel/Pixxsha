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
} from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
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

export default function Component() {
  const [activeTab, setActiveTab] = useState("Home");
  const folders = useSelector((state) => state.folder.folders);
  const tags = useSelector((state) => state.tags.tags);
  const nfts = useSelector((state) => state.image.images);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {itemsToRender.map((nft) => (
              <Card key={nft.id} className="rounded-none border shadow-sm">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      alt={`NFT ${nft.id}`}
                      src={nft.image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium">OATS {nft.id}</p>
                    {nft.name && (
                      <p className="text-xs text-gray-500">{nft.name}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                  Create a folder to organize your NFTs
                </p>
                <CreateFolderDialog />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {itemsToRender.map((folder, index) => (
                  <Card key={index} className="rounded-none border shadow-sm">
                    <CardContent className="p-4">
                      <Folder className="h-8 w-8 text-gray-500 mb-2" />
                      <h3 className="font-semibold">{folder.name}</h3>
                      <p className="text-sm text-gray-500">
                        {folder.description}
                      </p>
                    </CardContent>
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
                  Create a tag to categorize your NFTs
                </p>
                <CreateTagDialog />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {itemsToRender.map((tag, index) => (
                  <Card key={index} className="rounded-none border shadow-sm">
                    <CardContent className="p-4">
                      <Tag className="h-8 w-8 text-gray-500 mb-2" />
                      <h3 className="font-semibold">{tag.name}</h3>
                      <p className="text-sm text-gray-500">{tag.description}</p>
                    </CardContent>
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

  const NavItems = ({ onClick = () => {} }) => (
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
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.popup);
  const handleOpenPopup = () => {
    dispatch(openPopup());
  };
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      {isOpen && <ImageUploadPopup />}
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package className="h-6 w-6" />
              <span className="">OATS</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavItems />
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
                <NavItems onClick={() => {}} />
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
                  placeholder="Search..."
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
  );
}
