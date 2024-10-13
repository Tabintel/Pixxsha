import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { closePopup } from "../Features/popupslice";
import { uploadImage } from "../Features/image"; // Assuming this action exists
import { createTag, deleteTag } from "../Features/Dialog"; // Import the createTag action

const ImageUploadPopup = () => {
  const [preview, setPreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [isTagging, setIsTagging] = useState(false); // Toggle for using tags
  const [tagsInput, setTagsInput] = useState(""); // For user input of new tags
  const [tagsArray, setTagsArray] = useState([]); // For storing multiple tags
  const [existingTags, setExistingTags] = useState([]); // For existing tags
  const [selectedExistingTags, setSelectedExistingTags] = useState([]); // For storing selected existing tags
  const [isCreatingTag, setIsCreatingTag] = useState(false); // Loading state for creating tag
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const folders = useSelector((state) => state.folder.folders);
  const allTags = useSelector((state) => state.tags.tags); // Get tags from Redux state

  // Fetch existing tags when the component mounts
  useEffect(() => {
    setExistingTags(allTags);
  }, [allTags]);

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
        tags: [...tagsArray, ...selectedExistingTags], // Combine newly created and selected existing tags
      };

      dispatch(uploadImage(imagePayload)); // Dispatch the uploadImage action with the file's data
      alert(
        `Uploading ${uploadedFile.name} ${
          isTagging ? "with tags" : "to folder"
        }: ${
          [...tagsArray, ...selectedExistingTags]
            .map((tag) => tag.name)
            .join(", ") || selectedFolder
        }`
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
    setTagsInput("");
    setTagsArray([]); // Reset tags array
    setSelectedExistingTags([]); // Reset selected existing tags
    dispatch(closePopup());
  };

  const handleAddTag = (id) => {
    const trimmedInput = tagsInput.trim();
    if (trimmedInput && !tagsArray.find((tag) => tag.id === id)) {
      setTagsArray([...tagsArray, { id, name: trimmedInput }]); // Add new tag object to the array
      setTagsInput(""); // Clear input
    }
  };

  const handleRemoveTag = (id) => {
    setTagsArray(tagsArray.filter((tag) => tag.id !== id));
    dispatch(deleteTag(id)); // Remove tag from the array by ID
  };

  const handleCreateTag = () => {
    const trimmedInput = tagsInput.trim();
    if (trimmedInput) {
      setIsCreatingTag(true); // Set loading state
      const tagPayload = {
        id: Date.now(), // Generate a unique id for the new tag
        name: trimmedInput,
      };
      dispatch(createTag(tagPayload)); // Dispatch the createTag action
      handleAddTag(tagPayload.id); // Add the tag to the tagsArray
      setTagsInput(""); // Clear input after creation
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

        {/* Tags Input */}
        {isTagging && (
          <div className="mt-4">
            <label htmlFor="tags-input" className="block mb-2 text-sm">
              Add New Tags
            </label>
            <input
              type="text"
              id="tags-input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Type a new tag"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() => handleAddTag(Date.now())} // Pass a unique ID for the tag
              className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              Add Tag
            </button>
            <button
              onClick={handleCreateTag}
              className="mt-2 ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              disabled={isCreatingTag}
            >
              {isCreatingTag ? "Creating..." : "Create Tag"}
            </button>

            <div className="mt-2">
              <label className="block mb-2 text-sm">Select Existing Tags</label>
              <select
                multiple
                value={selectedExistingTags.map((tag) => tag.id)}
                onChange={(e) => {
                  const selectedIds = Array.from(e.target.selectedOptions).map(
                    (option) => option.value
                  );
                  const selectedTags = existingTags.filter((tag) =>
                    selectedIds.includes(tag.id.toString())
                  );
                  setSelectedExistingTags(selectedTags);
                }}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {existingTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2">
              {tagsArray.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag.name}
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {uploadedFile && (
          <div className="mt-4">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
