import React , {useState, useEffect} from "react";
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

const updateProduct = async ({ title, price, category, stock, id }) => {
  return fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, category, stock }),
  }).then(res => res.json()).then(console.log);
};

const Update_Product = ( {id,onSuccess} ) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");

    const queryClient = useQueryClient();
    const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data, variables) => {
      console.log("Product updated successfully", data);
      queryClient.invalidateQueries({ queryKey: ["product"] });
      if (onSuccess) {
        onSuccess(variables.title);
      }
    },
    onError: (error) => {
    console.log("Error updating product: ", error);
    },
});

return (
    <Dialog onOpenChange={(open) => {
  if (open) {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setPrice(data.price);
        setCategory(data.category);
        setStock(data.stock);
      });
  }
}}>

      <form>
        <DialogTrigger asChild>
          <Button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="indigo" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
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

                updateMutation.mutate({ title, price, category, stock, id });
              }}
>
  Update Product
</Button>
              </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Update_Product;