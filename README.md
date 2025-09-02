## **🛒Product Dashboard**

A small, responsive product management dashboard built with React, Tailwind CSS, Shadcn UI Components and React Query (TanStack Query), using the DummyJSON API.

---
## ⚡ Features
- 📱 **Responsive Layout** – Sidebar + Header + Main Content  
- 🔎 **Search Products** by title (uses DummyJSON API’s search endpoint)  
- 📑 **Pagination** – Browse 10 products per page with Next/Previous buttons  
- ➕ **Add Product** – Dialog form to add a product (with success feedback)  
- ✏️ **Update Product** – Edit button opens a pre-filled dialog form  
- 🗑️ **Delete Product** – Removes a product with a success confirmation  
- ⚡ **React Query Integration** – handles caching, refetching, pagination & filters automatically  
- 🎨 **UI Components** – Table, Dialog, Button, Inputs styled with Tailwind and shadcn components  
---
## 🛠️ Tech Stack & Libraries
- **React** – Frontend framework  
- **Tailwind CSS** – Utility-first CSS styling  
- **React Query (TanStack Query)** – API data fetching & mutations  
- **shadcn/ui components** – Table, Dialog, Button, etc. (manually added in `components/ui` since CRA doesn’t support shadcn directly)  
- **DummyJSON API** – Products API (`/products`, `/search`, `/add`, `/update`, `/delete`)  

---
## ⚙️ Setup Instructions

**Clone this repository**

  `git clone https://github.com/<your-username>/<your-repo>.git`

  `cd <your-repo>`

**Install dependencies**

  `npm install`

**Run locally (development mode)**

  `npm start`

**Build for production**

  `npm run build`

 ---
## 🚀 Deployment
 
https://product-dashboard-sage.vercel.app/
