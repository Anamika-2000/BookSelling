# E-commerce Book Shop

This is an e-commerce book shop application built with Node.js, Express, MongoDB, and Stripe for payment processing. The application allows users to browse books, add reviews, manage their cart, and complete purchases.

## Table of Contents

- [E-commerce Book Shop](#e-commerce-book-shop)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Project](#running-the-project)
  - [API Endpoints](#api-endpoints)
    - [User Authentication](#user-authentication)
      - [User Signup](#user-signup)
      - [User Login](#user-login)
      - [Reset Password](#reset-password)
      - [Get User Profile By UserId](#get-user-profile-by-userid)
      - [Get All Users](#get-all-users)
      - [Update User Profile](#update-user-profile)
      - [Delete User Profile](#delete-user-profile)
    - [Book Api's](#book-apis)
      - [Create Book](#create-book)
      - [Get All Books](#get-all-books)
      - [Get Book By Id](#get-book-by-id)
      - [Update Book](#update-book)
      - [Delete Book](#delete-book)
      - [Search Books](#search-books)
    - [Cart Api's](#cart-apis)
      - [Add Item to Cart](#add-item-to-cart)
      - [Delete Item From Cart](#delete-item-from-cart)
      - [Get Cart Items](#get-cart-items)
      - [Update Cart Item](#update-cart-item)
      - [Clear Cart](#clear-cart)
    - [Add Review](#add-review)
      - [Add Review](#add-review-1)
      - [Get Review](#get-review)
    - [Admin Api's](#admin-apis)
      - [Get All Books](#get-all-books-1)
      - [Get All Orders](#get-all-orders)
      - [Get All Users](#get-all-users-1)
    - [Payment Api's](#payment-apis)
      - [To Create Payment](#to-create-payment)
      - [Payment Webhook](#payment-webhook)
    - [Thankyou For Reading](#thankyou-for-reading)

## Installation

1. Clone the repository:
   ```bash
   git clone <gitRepoLink>
   cd <folder-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:
   ```bash
   MONGO_URI=<>
   STRIPE_SECRET_KEY=<>
   JWT_SECRET=keshav
   PORT=3000
   STRIPE_WEBHOOK_SECRET=<>
   ```

## Running the Project

1. Start the server:
   ```bash
   npm run server or npm run start
   ```
2. The server will start on http://localhost:3000.

## API Endpoints

### User Authentication

#### User Signup

- Endpoint: POST `/user/signup`
- Request Body:
```
{
  "firstName": "Anamkia",
  "lastName": "Gugu",
  "email": "anamika@gmail.com",
  "password": "guguanamkia",
  "confirmPassword": "guguanamkia",
  "image": "http://example.com/image.jpg",
  "isAdmin": true
}
```

#### User Login

- Endpoint: POST `/user/login`
- Request Body:
```
{
  "email": <>,
  "password": <>
}
```
`In response of login api you will get token key that token you have to use for further api calls in headers with token as key.`


#### Reset Password

- Endpoint: POST `/user/resetPassword`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>,
    "newPassword": <>
}
```

#### Get User Profile By UserId

- Endpoint: GET `/user/getUserProfile`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
   "userId": <>
}
```

#### Get All Users

- Endpoint: GET `/user/getUserProfile`
- Headers : token: <token_key_received_from_login>
- 

#### Update User Profile

- Endpoint: POST `/user/getUserProfile`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>,
    "firstName": <>,
    "lastName": <>,
    "email": <>,
    "password": <>,
    "image": <>
}
```

#### Delete User Profile

- Endpoint: POST `/user/deleteUserProfile`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>
}
```
### Book Api's

#### Create Book

- Endpoint: POST `/products/createBook`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "imageUrl": <>,
    "date": <>,
    "authorImageUrl": <>,
    "author": <>,
    "title": <>,
    "price": <>,
    "category": <>,
    "rating": <>,
    "description": <>
}
```

#### Get All Books

- Endpoint: GET `/products/getAllBooks`
- Headers : token: <token_key_received_from_login>


#### Get Book By Id

- Endpoint: GET `/products/getBookById`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "id": <>
}
```

#### Update Book

- Endpoint: PUT `/products/updateBook`
- Headers : token: <token_key_received_from_login>, id:<book_Id>
- Request Body:
```
{
    "price": 39.99,
    "rating": 4.8
}
```

#### Delete Book

- Endpoint: DELETE `/products/deleteBook`
- Headers : token: <token_key_received_from_login>, id:<book_Id>

#### Search Books

- Endpoint: GET `/products/searchBooks`
- Headers : token: <token_key_received_from_login>
- Query Params: <search_input>

### Cart Api's

#### Add Item to Cart

- Endpoint: POST `/cart/addToCart`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>,
    "items": [
        {
            "bookId": <>,
            "quantity": <number>
        },
        {
            "bookId": <>
            "quantity": <number>
        }
    ]
}
```

#### Delete Item From Cart

- Endpoint: DELETE `/cart/removeFromCart`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>,
    "items": [
        {
            "bookId": <>,
            "quantity": <number>
        }
    ]
}
```
#### Get Cart Items

- Endpoint: GET `/cart/getCartItems`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
   "userId": <>
}
```
#### Update Cart Item

- Endpoint: PUT `/cart/updateCartItem`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
    "userId": <>,
    "bookId": <>,
    "quantity": <number>
}
```
#### Clear Cart

- Endpoint: DELETE `/cart/clearCart`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
   "userId": <>
}
```

### Add Review

#### Add Review

- Endpoint: POST `/reviews/addReview`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
   "userId": <>,
   "bookId": <>,
   "rating": <number>,
   "comment": <>
}
```

#### Get Review

- Endpoint: GET `/reviews/getBookWithReviews`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
  "bookId": <>
}
```

### Admin Api's

#### Get All Books

- Endpoint: GET `/admin/books`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
  "bookId": <>
}
```
#### Get All Orders

- Endpoint: GET `/admin/orders`
- Headers : token: <token_key_received_from_login>

#### Get All Users

- Endpoint: GET `/admin/users`
- Headers : token: <token_key_received_from_login>


`Note - Only that users can use these admin api's those have isAdmin key as true`

### Payment Api's

#### To Create Payment

- Endpoint: POST `/payment/create`
- Headers : token: <token_key_received_from_login>
- Request Body:
```
{
   "userId": <>
}
```

#### Payment Webhook

- Endpoint: POST `/payment/webhook`
- Headers : token: <token_key_received_from_login> , Stripe-Signature: "whsec_test_signature"
- Request Body:
```
{
    "id": <>,
    "object": "event",
    "api_version": "2020-08-27",
    "created": 1623187332,
    "data": {
        "object": {
            "id": <>,
            "object": "payment_intent",
            "amount": <>,
            "currency": "<>,
            "metadata": {
                "userId": <>
            },
            "status": <>
        }
    },
    "livemode": <>,
    "pending_webhooks": <>,
    "request": {
        "id": <>,
        "idempotency_key": <>
    },
    "type": <>
}
```


### Thankyou For Reading






















   
