Here's the refined version of your documentation with the added content about future features and services, described in a detailed manner:

---

# Blogosaurus

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [File Structure](#file-structure)
6. [Usage](#usage)
7. [Routes](#routes)
8. [Models](#models)
9. [Services](#services)
10. [Contributing](#contributing)
11. [License](#license)
12. [Future Features and Services](#future-features-and-services)

## Introduction
**Blogosaurus** is a full-fledged blogging platform where users can create accounts, sign in, write blogs, comment on blogs, and manage their profiles. It leverages modern web technologies to provide a seamless user experience. The application is hosted on AWS Cloud and can be accessed [here](http://blogosaurus.ap-south-1.elasticbeanstalk.com).

## Features
- User authentication (Sign up, Sign in, and Logout)
- User profile management
- Blog creation, editing, and deletion
- Commenting on blog posts
- Responsive design using Bootstrap
- Image uploads for profile pictures and blog cover images

## Technologies Used
- **Frontend:** HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/kutkarshh/blogosaurus.git
    cd blogosaurus
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=8080
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`

## File Structure
```plaintext
.
├── models
│   ├── blog.js
│   ├── comment.js
│   └── user.js
├── public
│   └── images
│       └── uploads
├── routes
│   ├── blog.js
│   └── user.js
├── services
│   ├── authentication.js
│   └── imageUploader.js
├── views
│   ├── partials
│   │   ├── head.ejs
│   │   ├── navbar.ejs
│   │   └── script.ejs
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── home.ejs
│   ├── profile.ejs
│   ├── signin.ejs
│   └── signup.ejs
├── .env
├── .gitignore
├── app.js
└── package.json
```

## Usage
### Home Page
The home page displays all the blogs with their cover images, titles, and a link to view more details.
![Home Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/homepage2.png)
![Home Page Screenshot 2](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/homepage.png)

### Profile Page
The profile page displays user information and the blogs created by the user. Users can delete their blogs from this page.
![Profile Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/user_profile.png)

### Blog Page
Users can view blog posts by other user as well as comment on it to socialize and share thoughts.
![Blog Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633247/blogosaurus/Blog.png)
![Blog Page Screenshot2](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/blog2.png)

### Sign In / Sign Up
Users can sign in to their accounts or create new accounts to start blogging.
![Sign In Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633247/blogosaurus/signin.png)
![Sign Up Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/signup.png)

### Add Blog Page
Users can create a new blog post by filling out the title, description, and uploading a cover image.
![Add Blog Page Screenshot](https://res.cloudinary.com/kutkarsh/image/upload/v1722633246/blogosaurus/createBlog.png)

## Routes

### Blog Routes
- **GET** `/blog/add-new`: Render the form to add a new blog.
- **GET** `/blog/:id`: View a specific blog post.
- **POST** `/blog/add-new`: Add a new blog post.
- **GET** `/blog/delete/:id`: Delete a specific blog post.
- **POST** `/blog/edit/:id`: Edit a specific blog post.
- **POST** `/blog/comment/:blogId`: Add a comment to a specific blog post.

### User Routes
- **GET** `/user/signin`: Render the sign-in form.
- **GET** `/user/signup`: Render the sign-up form.
- **POST** `/user/signin`: Sign in the user.
- **POST** `/user/signup`: Sign up the user.
- **GET** `/user/profile`: View the user profile.
- **GET** `/user/logout`: Logout the user.

## Models
### User Model
```js
const userSchema = new Schema({
    fullName: String,
    email: String,
    salt: String,
    password: String,
    profileImageURL: { type: String, default: "/uploads/default.png" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
}, { timestamps: true });
```

### Blog Model
```js
const blogSchema = new Schema({
    title: String,
    body: String,
    coverImageURL: { type: String, default: "/images/uploads/blog/default.jpg" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });
```

### Comment Model
```js
const commentSchema = new Schema({
    content: String,
    blogId: { type: Schema.Types.ObjectId, ref: "blog" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });
```

## Services
### Authentication
Handles JWT token creation and validation.

### Image Uploader
Handles image uploads using Multer.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.

## Future Features and Services

**Social Media Integration**  
Allow users to share blog posts on social media platforms such as Facebook, Twitter, and LinkedIn. This will increase the reach of the blog posts and drive more traffic to the platform.

**Search Functionality**  
Implement a search bar to find blog posts by title, content, or author. This will help users to quickly find the content they are interested in.

**Tagging System**  
Allow users to categorize blog posts using tags. This will improve the organization of the content and make it easier for users to find related posts.

**Admin Dashboard**  
Create a dashboard for administrators to manage users, blog posts, and comments. This will provide better control over the platform and ensure that the content is moderated effectively.

**Email Notifications**  
Send email notifications to users when someone comments on their blog post or when there are updates related to their account. This will keep users engaged and informed about the activity on their posts.

**Mobile App**  
Develop a mobile app for Blogosaurus to allow users to access the platform on-the-go. This will provide a better user experience and make it easier for users to write and read blogs from their mobile devices.

---

Make sure to replace `link_to_screenshot1`, `link_to_screenshot2`, `link_to_screenshot3`, `link_to_screenshot4`, and `link_to_screenshot5` with the actual URLs of your screenshots.
