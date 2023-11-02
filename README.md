# Software Requirements Specification (SRS) for QuickNet - ISP Provider Website

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to define the requirements for the development of the QuickNet ISP Provider website.

### 1.2 Scope

The QuickNet ISP Provider website will serve as the online platform for customers to explore, select, and manage internet service plans and related services. The website will include features for user registration, plan selection, order processing, account management etc.

## 2. Project Overview

### 2.1 Description

QuickNet ISP Provider aims to provide high-speed and reliable internet services to users. The website will be the primary interface for customers to view available plans, place orders, and access customer support.

## 3. Functional Requirements

### 3.1 Registration and Authentication

- All Users [user, admin, super_admin] should be able to register with a valid email address.
- All Users [user, admin, super_admin] can log in using their registered credentials.
- Implement password validation and security measures.
- All Users [user, admin, super_admin] must log in to access their accounts.

### **3.2 User**

- Users can create and manage their profiles, including personal information.
- Users should be able to view and edit their profiles easily.
- Users can browse available plans.
- Implement a search feature allowing users to search plans by plan name.
- Users should be able to filter plans by price range and speed.
- Users can select order plans.
- Implement a smooth and user-friendly order process with confirmation.
- Users should be able to track the status of their bookings.
- Users can leave reviews and ratings for plans they have booked.
- Reviews and ratings should be displayed on plan listings.
- Develop a user dashboard displaying booking history and statuses.
- Users should have the option to cancel bookings if necessary.
- Design user-friendly feedback forms for users to submit comments and suggestions.

### **3.2 Admin**

- Admins should have access to a centralized dashboard to monitor and manage website activities.
- Admins can manage user accounts.
- Admins should be able to add, edit, and remove plans.
- Provide options for pricing, descriptions, and availability management for plans.
- Implement a order management system for administrators to view and manage order requests.
- Create a content management system for administrators to control website content, including blog posts and FAQs.
- Create a profile management system for admins to update their personal information.

### **3.3 Super Admin**

- Provide options for managing admin roles.
- Create a profile management system for super admins to update their personal information.

## 4. Non-Functional Requirements

### 4.1 Performance

- The website must respond to user interactions fast.
- The website should handle concurrent users effectively.

### 4.2 Security

- User data and payment information must be stored securely.
- Implement rate limiting to prevent abuse and enhance security by restricting the number of requests users can make within a specified time frame.

### 4.3 User Interface

- The website's user interface should be responsive and easy to navigate.
- It should be accessible on various devices and browsers.

## 5. System Architecture

### 5.1 High-Level System Architecture

The QuickNet ISP Provider website will use a client-server architecture. The front end will be developed using **NextJS 13**, and the back end will be implemented in **NodeJS, ExpressJS**. Data storage will be managed using a **PostgreSQL, Prisma**. Frontend and Backend is hosted on **Vercel** and database is hosted on **Supabase**.

# API Endpoints Design

Example: Route - HTTP Verb [Roles]

1. **Health Check**
   - `/healthcheck` - GET [All]
     - A basic health check to verify the availability of the service.
2. **Auth**
   - `/auth/register` - POST
     - Register a new user by providing user details.
   - `/auth/login` - POST
     - Log in and authenticate an existing user.
   - `/auth/refresh-token` - GET
     - Refresh the user's access token for authentication.
3. **Users**
   - `/users/:id` - GET [All]
     - Retrieve user information by their ID.
   - `/users/:id` - PATCH [All]
     - Update user information by their ID.
   - `/users/:id` - DELETE [All]
     - Delete a user by their ID.
   - `/users` - GET [admin, super_admin]
     - Retrieve a list of users (admin and super admin only).
4. **Profile**
   - `/profile` - GET [All]
     - View the user's own profile information.
5. **Plans**
   - **`/plans/:id`** - GET [All]
     - Retrieve information for a specific plan.
   - **`/plans/:id`** - PATCH [admin, super_admin]
     - Update information for a specific plan.
   - **`/plans/:id`** - DELETE [admin, super_admin]
     - Delete a specific plan.
   - **`/plans`** - GET [All]
     - Retrieve a list of all plans.
   - **`/plans`** - POST [admin, super_admin]
     - Create a new plan.
6. **Reviews**
   - **`/plans/:id/reviews`** - POST [admin, user, super_admin]
     - Post a review for a specific plan.
   - **`/plans/reviews`** - GET [All]
     - Retrieve all plan reviews.
7. **User Orders**
   - **`/orders/user`** - GET [user]
     - Retrieve orders associated with a single authenticated user.
8. **Orders**
   - **`/orders/:id`** - GET [admin, user]
     - Retrieve information for a specific order.
   - **`/orders/:id`** - PATCH [admin, user]
     - Update information for a specific order.
   - **`/orders/:id`** - DELETE [admin, user]
     - Delete a specific order.
   - **`/orders`** - GET [admin]
     - Retrieve a list of all orders.
   - **`/orders`** - POST [admin, user]
     - Create a new order.
9. **Feedbacks**
   - **`/feedbacks`** - GET [admin]
     - Retrieve a list of all feedback submissions.
   - **`/feedbacks`** - POST [All]
     - Submit new feedback.

10, **Blogs**

- **`/blogs/:id`** - GET [All]
  - Retrieve a single blog post by its ID.
- **`/blogs/:id`** - PATCH [admin, super_admin]
  - Update a blog post by its ID.
- **`/blogs/:id`** - DELETE [admin, super_admin]
  - Delete a blog post by its ID.
- **`/blogs`** - GET [All]
  - Retrieve a list of all blog posts.
- **`/blogs`** - POST [admin, super_admin]
  - Create a new blog post.

1.  **FAQs**
    - **`/faqs/:id`** - GET [admin, super_admin]
      - Retrieve a single FAQ by its ID.
    - **`/faqs/:id`** - PATCH [admin, super_admin]
      - Update an FAQ by its ID.
    - **`/faqs/:id`** - DELETE [admin, super_admin]
      - Delete an FAQ by its ID.
    - **`/faqs`** - GET [All]
      - Retrieve a list of all FAQs.
    - **`/faqs`** - POST [admin, super_admin]
      - Create a new FAQ.

# Database Design

![Database Diagram](/src/data/images/isp-db-diagram.png)
