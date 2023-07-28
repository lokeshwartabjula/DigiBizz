import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader.js';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.Credentials({
    accessKeyId: 'ASIAQWTFRT6ZAV4BQILR',
    secretAccessKey: 'NT2FFqJzkh50nF3P6zu6uCCPoNhrJXnIIMazKS/J',
    sessionToken:
      'FwoGZXIvYXdzEOX//////////wEaDH5QrcOB7NeEojlQBSK+AfSutL8jv3Fmgcp/jEK6pBmWqx9rWi05yoYOBkYy/nZ1JNeqEcPpnpiIngDZfDpHFZeAynT9Mo+6ckOkrYdgeGvzKRuRhArM7lYGWdjYcGl7ODZ9WfF8dr5kPb6dDvXjSJhItEZLU3Rx+ThT1kFCz/5nCgnUuMN0+GSXwGaag1sYZCB8XuIEO31SHMKU4CR9rTCpODk9aS4048BFeBqu9PkVLgIR2tBlaA9uiMFNid+PghwrJxv0GeLSUJCbOIwo9+2MpgYyLcTDVixeU/N+x4aZybkJhQdB7sBaNj6vhd6ezHFbgcqZz1ymrsk+UapHW5M0KQ=='
  })
});

const s3 = new AWS.S3();

export default function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image_url: null
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const uuid = uuidv4();

      const fileExtension = selectedFile.name.split('.').pop();

      // Create the new file name with UUID in between
      const fileName = `${selectedFile.name}-${uuid}.${fileExtension}`;

      try {
        const uploadParams = {
          Bucket: 'digibizz-bucket',
          Key: fileName,
          Body: selectedFile,
          ContentType: selectedFile.type
        };

        const uploadResult = await s3.upload(uploadParams).promise();

        if (uploadResult && uploadResult.Location) {
          return uploadResult.Location;
        } else {
          console.error('Error uploading image to S3.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedFile ||
      !formData.name ||
      !formData.category ||
      !formData.description ||
      !formData.price
    ) {
      alert('please enter all form fields');
      return;
    }

    setLoading(true);

    const url = await handleUpload();

    const dataToSend = {
      ...formData,
      image_url: url
    };

    try {
      const response = await axios.post(
        'https://65bt3ppugh.execute-api.us-east-1.amazonaws.com/develop/api/store-data',
        dataToSend
      );

      setSelectedFile(null);
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        image_url: null
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form
        className="max-w-sm bg-white pt-10 pb-24 m-auto"
        // action="/AddItems"
        // method="GET"
        onSubmit={handleSubmit}
      >
        <div class="mx-8">
          <h2 className="text-base font-semibold leading-7 text-xl text-gray-900">
            Add Items
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="number"
                  onChange={handleChange}
                  name="price"
                  id="price"
                  value={formData.price}
                  placeholder="$"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <input
                class="file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-500
                block mt-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <FullScreenLoader loading={loading} />
    </div>
  );
}
