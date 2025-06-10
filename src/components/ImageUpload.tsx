import React, { useState } from 'react';
import { Upload, Image, FileImage, X, Eye } from 'lucide-react';

interface MedicalImage {
  id: string;
  file: File;
  type: 'xray' | 'ultrasound' | 'scan' | 'photo';
  description: string;
  url: string;
}

interface ImageUploadProps {
  onImagesUpdate: (images: MedicalImage[]) => void;
}

export default function ImageUpload({ onImagesUpdate }: ImageUploadProps) {
  const [images, setImages] = useState<MedicalImage[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: MedicalImage = {
            id: Date.now().toString() + Math.random().toString(),
            file,
            type: 'photo',
            description: '',
            url: e.target?.result as string
          };
          const updatedImages = [...images, newImage];
          setImages(updatedImages);
          onImagesUpdate(updatedImages);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const updateImageDetails = (id: string, field: keyof MedicalImage, value: string) => {
    const updatedImages = images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    );
    setImages(updatedImages);
    onImagesUpdate(updatedImages);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    onImagesUpdate(updatedImages);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <FileImage className="h-6 w-6 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Medical Imaging</h2>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Upload Medical Images</p>
            <p className="text-sm text-gray-500 mb-4">
              X-rays, Ultrasounds, CT Scans, or Photos
            </p>
            <div className="bg-blue-600 text-white px-6 py-2 rounded-md inline-block hover:bg-blue-700">
              Choose Files
            </div>
          </label>
        </div>
      </div>

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Uploaded Images</h3>
          {images.map((image) => (
            <div key={image.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="relative">
                <img
                  src={image.url}
                  alt="Medical image"
                  className="w-20 h-20 object-cover rounded-md border border-gray-300"
                />
                <button
                  onClick={() => setPreviewImage(image.url)}
                  className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700"
                >
                  <Eye className="h-3 w-3" />
                </button>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Type
                  </label>
                  <select
                    value={image.type}
                    onChange={(e) => updateImageDetails(image.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="photo">Clinical Photo</option>
                    <option value="xray">X-Ray</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="scan">CT/MRI Scan</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description/Notes
                  </label>
                  <textarea
                    value={image.description}
                    onChange={(e) => updateImageDetails(image.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the image, body part, or any relevant notes..."
                  />
                </div>
              </div>
              
              <button
                onClick={() => removeImage(image.id)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}