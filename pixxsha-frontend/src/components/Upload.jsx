import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { closePopup } from "../Features/popupslice";
import { uploadImage } from "../Features/image"; // Assuming this action exists
import { createTag } from "../Features/Dialog"; // Import the createTag action

const ImageUploadPopup = () => {
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isTagging, setIsTagging] = useState(false); // Toggle for using tags
  const [selectedTag, setSelectedTag] = useState(""); // For tag selection
  const [newTagName, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false); // Loading state for creating tag
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const folders = useSelector((state) => state.folder.folders);
  const tags = useSelector((state) => state.tags.tags); // Get tags from Redux state

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setUploadedFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleUpload = () => {
    if (uploadedFile) {
      const imagePayload = {
        id: Date.now(), // Generate a unique id
        url: URL.createObjectURL(uploadedFile), // Temporary URL for image preview
        metadata: {
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type,
        },
        folderId: isTagging ? null : selectedFolder, // Use folder if tagging is off
        tags: isTagging ? [selectedTag] : [], // Use tags if tagging is on
      };

      dispatch(uploadImage(imagePayload)); // Dispatch the uploadImage action with the file's data
      alert(
        `Uploading ${uploadedFile.name} ${
          isTagging ? "with tag" : "to folder"
        }: ${isTagging ? selectedTag : selectedFolder}`
      );
      handleClose(); // Close the popup after upload
    } else {
      alert("Please upload an image.");
    }
  };

  // Function to close the popup
  const handleClose = () => {
    setPreview(null);
    setUploadedFile(null);
    setSelectedFolder("");
    setSelectedTag("");
    setNewTagName("");
    dispatch(closePopup());
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      setIsCreatingTag(true); // Set loading state
      const tagPayload = {
        id: Date.now(), // Generate a unique id for the new tag
        name: newTagName,
      };
      dispatch(createTag(tagPayload)); // Dispatch the createTag action
      setNewTagName(""); // Clear input after creation
      setIsCreatingTag(false); // Reset loading state
    }
  };

  if (!isOpen) return null; // Hide popup if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715; {/* X symbol */}
        </button>
        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          className={`w-full h-64 flex items-center justify-center rounded-lg border-2 ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500">
              Drag 'n' drop an image here, or click to select one
            </p>
          )}
        </div>

        {/* Toggle between Folder and Tag */}
        <div className="mt-4">
          <label className="block mb-2 text-sm">Choose Upload Method:</label>
          <div>
            <label>
              <input
                type="radio"
                value="folder"
                checked={!isTagging}
                onChange={() => setIsTagging(false)}
              />
              Folder
            </label>
            <label className="ml-4">
              <input
                type="radio"
                value="tag"
                checked={isTagging}
                onChange={() => setIsTagging(true)}
              />
              Tag
            </label>
          </div>
        </div>

        {/* Folder Dropdown */}
        {!isTagging && (
          <div className="mt-4">
            <label htmlFor="folder-select" className="block mb-2 text-sm">
              Select Folder
            </label>
            <select
              id="folder-select"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Select Folder --</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tag Dropdown */}
        {isTagging && (
          <div className="mt-4">
            <label htmlFor="tag-select" className="block mb-2 text-sm">
              Select Tag
            </label>
            <select
              id="tag-select"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Select Tag --</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>

            {/* Create New Tag */}
            <div className="mt-4">
              <label htmlFor="new-tag" className="block mb-2 text-sm">
                Create New Tag
              </label>
              <input
                type="text"
                id="new-tag"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New Tag Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleCreateTag}
                disabled={isCreatingTag} // Disable button while creating tag
                className={`mt-2 px-4 py-2 ${
                  isCreatingTag
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600"
                } text-white rounded-lg`}
              >
                {isCreatingTag ? "Creating..." : "Create Tag"}
              </button>
            </div>
          </div>
        )}

        {/* Upload Button */}
        {uploadedFile && (
          <div className="mt-4">
            <button
              onClick={handleUpload}
              className="align-center text-white rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full rounded-none"
            >
              Upload Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPopup;
