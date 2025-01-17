import React, { useContext, useState } from 'react';
import Webcam from 'react-webcam';
import { UserContext } from '../../../context/AppContext';

function ImageCapture() {
  const { user } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [capturing, setCapturing] = useState(false); // State to manage when the webcam is active
  const webcamRef = React.useRef(null);

  const captureImage = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFile(imageSrc);
    setCapturing(false); // Stop capturing after taking the screenshot
  }, [webcamRef, setFile]);

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 w-full">
      <div className="flex justify-end">
        <input
          type="search"
          placeholder="🔍 Search"
          className="bg-gray-300 w-1/2 p-2 rounded-lg"
        />
      </div>

      <p className="text-xl md:text-2xl font-bold">
        Welcome, <span className="text-cyan-700">Dr. {user.lastName}!</span>
      </p>

      <div className="flex space-x-6">

        <button
          className="bg-gray-300 p-2 rounded-md"
          onClick={() => setCapturing(true)}
        >
          Capture Image
        </button>

        <label
          htmlFor="file"
          className="bg-gray-300 p-2 rounded-md cursor-pointer shadow-md font-medium hover:bg-gray-100 transition-all duration-150 ease-in-out"
        >
          Upload Image
        </label>
        <input
          className="hidden"
          id="file"
          type="file"
          onChange={(e) => {
            setFile(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>

      <div>
        {capturing ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
        ) : (
          <img
            src={file ?? './images/image-capture-page.jpg'}
            alt="Captured"
            className="w-full"
          />
        )}
      </div>

      <div className="flex justify-center space-x-10">
        <button className="bg-gray-300 p-2 rounded-md" onClick={() => setCapturing(true)}>Retake</button>
      </div>

      <div className="flex justify-end">
        <button className="bg-gray-300 w-1/3 p-2 rounded-md" onClick={captureImage}>Submit</button>
      </div>
    </div>
  );
}

export default ImageCapture;
