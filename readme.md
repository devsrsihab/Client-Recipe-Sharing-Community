# Recipe Sharing Community - Client Side

## Project Overview

The **Recipe Sharing Community** is a full-stack web application that allows cooking enthusiasts to share, discover, and organize recipes. This project focuses on the client-side development using **Next.js**, **Redux**, and **TypeScript**.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization using JWT
- Recipe submission with detailed ingredient lists
- Built-in cooking timer and interactive ingredient checklist
- Rating and commenting system for recipes
- Advanced search and filter options
- Responsive UI/UX design
- User profiles with social connectivity (follow/unfollow)
- Premium membership subscription for exclusive content

## Technologies Used

- **Technology:**
  - Next.js
  - TypeScript for type safety
  - Tailwind CSS (optional for styling)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-sharing-community-client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd recipe-sharing-community-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_BASE_API=your_base_api_url
   NEXT_PUBLIC_GEMINI_API=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
   ```

   Replace the placeholder values with your actual API keys and configuration details.

5. Start the development server:

   ```bash
   npm run dev
   ```
