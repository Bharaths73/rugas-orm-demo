# 🚀 Order Management System

A full-stack **Order Management System** built using the **MERN stack** with **Tailwind CSS** and **Shadcn** for UI styling. The application allows customer onboarding, product listing, order management with filters, and order status updates.

## ✨ Features

✅ **Customer Onboarding**: Register and manage customer details.  
✅ **Product Listing**: View available products with details.  
✅ **Order Management**: Place, update, and track orders.  
✅ **Status Updates**: Modify order status dynamically.  
✅ **Secure Authentication**: Implemented using JWT.  

## 🛠️ Tech Stack

### 🖥️ Frontend:
- ⚛️ React.js  
- 🏪 Redux Toolkit  
- 🎨 Tailwind CSS
- 🎨 ShadCn
- 🔗 Axios  

### 🖥️ Backend:
- 🟢 Node.js  
- 🚀 Express.js  
- 🗄️ MongoDB (Mongoose ORM)  
- 🔐 JWT Authentication  

## 📦 Installation

1. **Clone the repository** 🛠️  
   ```sh
   git clone https://github.com/Bharaths73/rugas-orm-demo
   
2. **Install dependencies for frontend** 🛠️  
   ```sh
   cd frontend
   npm install
3. **Install dependencies for Backend** 🛠️  
   ```sh
   cd backend
   npm install
4. **create .env file in backend and add this environment variables** 🛠️  
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
5. **create .env file in frontend and add this environment variables** 🛠️  
   ```sh
   VITE_APP_BASE_URL=http://localhost:3000/api/v1
   VITE_APP_FILE_URL=http://localhost:3000/
6. **start frontend** 🛠️  
   ```sh
   npm run dev
6. **start backend** 🛠️  
   ```sh
   npm run dev
