About the Project

This project is a backend API built using TypeScript and Express.js, designed for managing posts, categories, and comments. It leverages Prisma ORM for database interactions, providing a type-safe way to communicate with a PostgreSQL database. The API allows for full CRUD operations on posts, categories, and comments, which can be used to power blog-like applications or other content management systems.

Key Features:

RESTful API endpoints for managing posts, categories, and comments.

Type-safe code with TypeScript for fewer runtime errors.

Prisma ORM for simplified database management and migrations.

Express.js framework for routing and middleware management.

PostgreSQL database integration.

Technologies Used

Node.js

Express.js

TypeScript

Prisma ORM

PostgreSQL

dotenv for environment variable management

Installation

To set up the project locally, follow these steps:

Clone the repository:

git clone https://github.com/your-username/your-repository.git
cd your-repository

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory and provide the necessary configurations:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ts-prisma?schema=public"

Run database migrations:

npx prisma migrate dev

Start the development server:

npm run dev

API Endpoints

The following endpoints are available:

Posts

GET /posts: Retrieve all posts.

GET /posts/:id: Retrieve a post by its ID.

POST /posts: Create a new post.

PUT /posts/:id: Update an existing post.

DELETE /posts/:id: Delete a post by its ID.

Categories

GET /categories: Retrieve all categories.

GET /categories/:id: Retrieve a category by its ID.

POST /categories: Create a new category.

PUT /categories/:id: Update an existing category.

DELETE /categories/:id: Delete a category by its ID.

Comments

GET /comments: Retrieve all comments.

GET /comments/:id: Retrieve a comment by its ID.

POST /comments: Create a new comment.

PUT /comments/:id: Update an existing comment.

DELETE /comments/:id: Delete a comment by its ID.

Scripts

Build: Compile TypeScript to JavaScript

npm run build

Start: Start the server in production mode

npm start

Dev: Start the server in development mode with TypeScript and hot-reloading

npm run dev

Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for improvement ideas, bugs, or other concerns.

License

This project is licensed under the MIT License.
