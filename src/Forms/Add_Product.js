import React , {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const createProduct = async ({ title, price, category, stock }) => {
  return fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, category, stock }),
  }).then(res => res.json()).then(console.log);
};


const Add_Product = ({onSuccess}) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("")
    const queryClient = useQueryClient();
    const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data,variables) => {
    console.log("Product added successfully");
    queryClient.invalidateQueries({ queryKey: ["product"] });
    if (onSuccess) {
        onSuccess(variables.title);
      }
    },
    onError: (error) => {
    console.log("Error adding product: ", error);
    },
});

return (
    <Dialog className="m-4">
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:text-white hover:bg-purple-700 border-purple-400">Add Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" onChange={(e) => setTitle(e.target.value)} 
                value={title} placeholder="Product Title" />
            </div>
            <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="0" type="number" />
            </div>
            <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Product Category"/>
            </div>
            <div className="grid gap-3">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" name="stock" onChange={(e) =>setStock(e.target.value)} value={stock} placeholder="0" type="number" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
            <Button
              type="submit"
              variant="outline"
              onClick={(e) => {
                productMutation.mutate({ title, price, category, stock });
              }}
>
  Add Product
</Button>
              </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Add_Product;