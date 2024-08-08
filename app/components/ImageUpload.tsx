import React, { useState, useEffect } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  image: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, image }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="image-upload"
      >
        Upload Plant Image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
      >
        Select Image
      </label>
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
