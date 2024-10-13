import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2Icon, Trash2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { closefolderPopup } from "@/Features/Folderpopup";
import { deleteImage } from "@/Features/image"; // Import your delete action

export default function FolderContent({ folderId, foldername }) {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [showShareLink, setShowShareLink] = useState(false);
  const [shareOption, setShareOption] = useState("public"); // Default to public

  // Fetch images from Redux store
  const images = useSelector((state) => state.image.images);
  console.log("Fetched images from Redux store:", images);

  useEffect(() => {
    if (folderId) {
      const imagesInFolder = images.filter(
        (image) => image.folderId == folderId
      );
      console.log("Images in the selected folder:", imagesInFolder); // Log filtered images
      setFilteredImages(imagesInFolder);
    }
  }, [folderId, images]);

  const handleSelect = (id) => {
    setSelectedImages(
      (prev) =>
        prev.includes(id)
          ? prev.filter((imageId) => imageId !== id) // Deselect the image
          : [...prev, id] // Select the image
    );
  };

  const handleShare = () => {
    setShowShareLink(true); // Show share link component
  };

  const handleDelete = () => {
    if (selectedImages.length === 0) return; // Guard clause

    // Loop through selected images and dispatch delete action for each ID
    selectedImages.forEach((imageId) => {
      dispatch(deleteImage(imageId)); // Dispatch action to delete the image by ID
    });

    // Update filtered images to exclude deleted images
    setFilteredImages((prev) =>
      prev.filter((image) => !selectedImages.includes(image.id))
    );

    // Show success toast

    // Clear selected images after deletion
    setSelectedImages([]);
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  // Function to generate share link based on share option
  const generateShareLink = () => {
    return shareOption === "public"
      ? "https://example.com/share/public"
      : "https://example.com/share/private";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/50">
      <div className="bg-white rounded-lg p-8 w-full max-w-6xl shadow-lg relative">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          {foldername}
        </h1>
        <Button
          className="absolute top-4 right-4"
          variant="outline"
          size="icon"
          onClick={() => dispatch(closefolderPopup())}
        >
          <XIcon className="w-5 h-5" />
        </Button>

        {filteredImages.length === 0 ? (
          <div className="text-center">
            <p className="text-lg font-semibold">
              No images found in this folder.
            </p>
            <p className="text-muted-foreground">
              Please upload or add images to this folder.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-end space-x-2 mb-4">
              <Button
                onClick={handleShare}
                disabled={selectedImages.length === 0}
                variant="outline"
                size="sm"
              >
                <Share2Icon className="w-4 h-4 mr-2" />
                Share ({selectedImages.length})
              </Button>
              <Button
                onClick={handleDelete}
                disabled={selectedImages.length === 0}
                variant="destructive"
                size="sm"
              >
                <Trash2Icon className="w-4 h-4 mr-2" />
                Delete ({selectedImages.length})
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    selectedImages.includes(image.id)
                      ? "ring-2 ring-primary" // Highlight selected image
                      : ""
                  }`}
                >
                  <CardContent className="p-0 relative">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => handleSelect(image.id)}
                      className="absolute top-2 left-2 z-10"
                    />
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-64 object-cover"
                      onClick={() => handlePreview(image)} // Click on image to preview
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        {image.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Price
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Glassmorphic Share Link Component */}
            {showShareLink && (
              <div className="fixed inset-0 flex items-center justify-center z-60">
                <div className="bg-white bg-opacity-30 backdrop-blur-md border border-gray-300 rounded-lg p-6 shadow-lg max-w-md">
                  <h2 className="text-lg font-semibold mb-2">Share Options</h2>
                  <div className="flex items-center mb-4">
                    <label className="mr-2">
                      <input
                        type="radio"
                        value="public"
                        checked={shareOption === "public"}
                        onChange={() => setShareOption("public")}
                      />
                      Public
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="private"
                        checked={shareOption === "private"}
                        onChange={() => setShareOption("private")}
                      />
                      Private
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Share Link: {generateShareLink()}</span>
                    <Button onClick={() => setShowShareLink(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {previewImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closePreview}
          >
            <div className="relative">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-w-full max-h-full object-contain"
              />
              <Button
                className="absolute top-4 right-4 text-white"
                onClick={closePreview}
                variant="outline"
                size="icon"
              >
                <XIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
