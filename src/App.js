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
import Sidebar from "./components/ui/sidebar";
import Header from "./components/ui/header";

function deleteProduct(id) {
  fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(console.log);
}

function App() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data, isLoading, isError }  = useQuery({
    queryKey: ["product",currentPage,searchQuery],
    queryFn: async () => {
      if(searchQuery){
        const res = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}&limit=10&skip=${currentPage * 10}`);
        return res.json();
      }else{
      const res = await fetch( `https://dummyjson.com/products?limit=10&skip=${currentPage * 10}`);
      return res.json();
      }
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
      <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
          <div className="flex flex-col gap-2 m-2 ml-4 mr-4 mt-3 md:flex-row">
            <Input
          type="text"
          placeholder="Search Product"
          className="mr-1 md:mr-4"
          value={searchQuery}
          onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(0); 
          }}/>
            <Add_Product />
            </div>
          
      <div className="ml-4">
    {isLoading && <p>Loading...</p>}
    {isError && <p>Error loading products</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="hidden md:table-cell text-center">Category</TableHead>
            <TableHead className="hidden md:table-cell text-center">Stock</TableHead>
            <TableHead className="text-center">Edit</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
              <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
              <TableCell className="">
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
      <div className="flex gap-2 justify-center">
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
    </div>
  );
}

export default App;
