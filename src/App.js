import { useQuery } from "@tanstack/react-query";
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

function App() {
  const {data} = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products");
      return res.json();
    },
  });

  console.log(data);

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
      <Table>
        <TableCaption>Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      </div>
    </div>
  );
}

export default App;
