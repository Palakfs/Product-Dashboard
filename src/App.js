import { useQuery,useMutation, useQueryClient} from "@tanstack/react-query";
import React, { useState } from "react";
import "./App.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import Add_Product from "./Forms/Add_Product";
import Update_Product from "./Forms/Update_Product";

function deleteProduct(id) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(console.log);
}

function App() {
  const [currentPage, setCurrentPage] = React.useState(0);
  
  const { data, isLoading, isError }  = useQuery({
    queryKey: ["product",currentPage],
    queryFn: async () => {
      const res = await fetch( `https://dummyjson.com/products?limit=10&skip=${currentPage * 10}`);
      return res.json();
    },
    keepPreviousData: true
  });

  console.log(data);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
      console.log("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      },
      onError: (error) => {
      console.log("Error deleting product: ", error);
      },
  });
  

  return (
    <div className="App">
      <div className="flex flex-col gap-4 p-10">
        <div className="flex flex-row padding-10 justify-between">
          <h2>Products</h2>
          <div className="flex flex-row gap-2">
            <Input placeholder="Search Product" />
            <Add_Product />
            </div>
          </div>
      <div className="margin-100">
    {isLoading && <p>Loading...</p>}
    {isError && <p>Error loading products</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
              <TableCell className="text-right">
                <Update_Product id={product.id}/>
              </TableCell>
              <TableCell>
                <Button onClick={(e) => {
                deleteMutation.mutate(product.id);
              }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <div className="flex gap-2 mt-4">
  <Button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
    disabled={currentPage === 0}
    variant="outline"
  >
    Previous
  </Button>

  <Button
    onClick={() => setCurrentPage((p) => p + 1)}
    disabled={!data || (currentPage + 1) * 10 >= data.total}
    variant="outline"
  >
    Next
  </Button>
</div>

      </div>
    </div>
  );
}

export default App;
