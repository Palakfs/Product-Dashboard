import React from "react";
import { Button } from "./components/ui/button";

const Add_Product = () => {
  return ( 
  <div className="flex flex-col">
    <h2>Add Product</h2>
    <div className="flex flex-col gap-4 p-10">
        <input type="text" placeholder="Title" className="border p-2 rounded-md"/>
        <input type="number" placeholder="Price" className="border p-2 rounded-md"/>
        <input type="text" placeholder="Category" className="border p-2 rounded-md"/>
        <input type="number" placeholder="Stock" className="border p-2 rounded-md"/>
        <Button variant="outline">Add Product</Button>
    </div>
  </div>
  );
}

export default Add_Product;