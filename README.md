# E-Commerce API

A robust and secure E-Commerce API built with Node.js, Express, and MongoDB. This API provides a complete backend solution for e-commerce platforms with features like user authentication, product management, order processing, and review systems.

## 🚀 Features

- **User Authentication**
  - JWT-based authentication
  - Google OAuth 2.0 integration
  - Secure password hashing with bcrypt
  - Cookie-based session management

- **Product Management**
  - CRUD operations for products
  - File upload support for product images
  - Product categorization and filtering

- **Order System**
  - Order creation and management
  - Order status tracking
  - Order history

- **Review System**
  - Product reviews and ratings
  - Review management

- **Security Features**
  - XSS protection
  - NoSQL injection prevention
  - Rate limiting
  - CORS protection
  - Secure HTTP headers

## 🛠️ Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)

- **Authentication & Security**
  - JWT
  - Passport.js
  - bcryptjs
  - Cookie-parser

- **Security Middleware**
  - Helmet
  - xss-clean
  - express-mongo-sanitize
  - cors
  - express-rate-limiter

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/pavan-ak1/E-Commerce-API.git
cd E-Commerce-API
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/google` - Google OAuth login
- `POST /api/v1/auth/logout` - User logout

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get single user
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product
- `PATCH /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

### Reviews
- `GET /api/v1/reviews` - Get all reviews
- `GET /api/v1/reviews/:id` - Get single review
- `POST /api/v1/reviews` - Create review
- `PATCH /api/v1/reviews/:id` - Update review
- `DELETE /api/v1/reviews/:id` - Delete review

### Orders
- `GET /api/v1/orders` - Get all orders
- `GET /api/v1/orders/:id` - Get single order
- `POST /api/v1/orders` - Create order
- `PATCH /api/v1/orders/:id` - Update order status

## 🔒 Security

This API implements several security measures:
- Input sanitization
- XSS protection
- Rate limiting
- Secure password hashing
- JWT token authentication
- CORS protection
- Secure HTTP headers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 📞 Support

For support, please open an issue in the GitHub repository.
