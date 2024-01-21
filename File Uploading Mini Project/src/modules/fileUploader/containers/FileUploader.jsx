import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ImageListing from '../components/ImageListing';

const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      file,
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const handleDelete = (fileName) => {
    const filteredFiles = uploadedFiles.filter(
      (file, index) => index !== fileName
    );
    setUploadedFiles(filteredFiles);
  };

  const handleSubmit = async () => {
    const body = {
      fileName: uploadedFiles[0].name,
      contentType: 'image/png',
    };

    const response = await axios.put(
      'http://localhost:4000/api/files/upload-image',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response?.data) {
      await axios.put(response?.data, uploadedFiles[0].file, {
        headers: {
          'Content-Type': 'image/png',
        },
      });
    }

    setUploadedFiles([]);
    getAllImages();
  };

  const getAllImages = async () => {
    const response = await axios.get(
      'http://localhost:4000/api/files/get-all',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setImages(response?.data);
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 py-4-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-md shadow-md">
        <div
          {...getRootProps()}
          className={`border-4 border-dashed ${
            isDragActive ? 'border-blue-500' : 'border-gray-300'
          } p-10 text-center cursor-pointer mb-4`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop files here or click to select files
          </p>
        </div>
        <div className="flex flex-wrap">
          <ImageListing images={uploadedFiles} onDelete={handleDelete} isDeleted/>
        </div>
        {uploadedFiles?.length ?(
          <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        ):null}
       
        <ImageListing images={images} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default FileUploader;
