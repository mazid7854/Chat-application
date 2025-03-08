import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ imageFile, onCropComplete }) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    aspect: 1,
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const onImageLoaded = (img) => {
    setImage(img);
  };

  const getCroppedImage = () => {
    if (!image || !crop.width || !crop.height) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const croppedX = crop.x * scaleX;
    const croppedY = crop.y * scaleY;
    const croppedWidth = crop.width * scaleX;
    const croppedHeight = crop.height * scaleY;

    const canvas = document.createElement("canvas");
    canvas.width = croppedWidth;
    canvas.height = croppedHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      croppedX,
      croppedY,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob);
        setShowCropper(false); // Close modal only after cropping
      }
    }, "image/jpeg");
  };

  return (
    <div className="cropper-modal">
      {imageUrl && (
        <ReactCrop
          src={imageUrl}
          crop={crop}
          onChange={setCrop}
          onComplete={(c) => setCrop(c)} // Capture final crop values
          onImageLoaded={onImageLoaded}
        />
      )}
      <button onClick={getCroppedImage}>Crop</button>
    </div>
  );
};

export default ImageCropper;
