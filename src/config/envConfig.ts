const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_BASE_API,
  geminiApi: process.env.NEXT_PUBLIC_GEMINI_API,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  serverBaseUrl: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
};

export default envConfig;
