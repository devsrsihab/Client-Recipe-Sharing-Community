const CLOUDINARY_CLUD_NAME = "dzkmp0xxd";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLUD_NAME}/image/upload`;
const UPLOAD_PRESET = "sr_photo_up";
const cloudinaryUpload = async (image: File): Promise<string> => {
  //if image exist
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary.");
    }

    const data = await response.json();
    return data.secure_url;
  } else {
    //throw new error if not exist
    throw new Error("Image not found");
  }
};

export default cloudinaryUpload;
