import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import { AlertDialogComponent } from "./Alert";
import { FaEdit } from "react-icons/fa";


export function UpdateBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  // Validation logic
  const validateInput = () => {
    if (!blogTitle.trim() || !image.trim() || !content.trim()) {
      setError("Please fill all the fields");
      return false;
    }
    
    if (content.length > 5000) {
      setError("Blog content must be at least 5000 characters long.");
      return false;
    }
    setError("");
    setIsAlertOpen(true);
    return true;
  };
  const handleSubmit = async () => {
    if (!validateInput()) return;

    const formData = {
      title: blogTitle,
      image: image,
      content: content,
    };
    console.log(formData);
    // setLoading(true);
    // try {
    //   const response = await productService.createProduct(formData);

    //   alert("Product added successfully!");
    //   console.log("Response:", response.data);
    // } catch (error) {
    //   alert("Error adding product. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    setIsDialogOpen(false);
  }
  const handleClose = () => {
    setIsDialogOpen(false);
    setBlogTitle("");
    setImage("");
    setContent("");
    setError("");
  };


  return (
    <Dialog
    open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
        setIsDialogOpen(open);
      }}>
      <DialogTrigger asChild>
      <Button
          variant="outline"
          className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
            <FaEdit/>
            Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">Update Blog</DialogTitle>
          <DialogDescription>
          Update the blog details below and click save to update blog.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Product Details Inputs */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Blog Title</Label>
            <div className="col-span-3"><Input id="name" placeholder="Enter blog title" className={`w-full ${error ? "border-red-500" : ""}`} onChange={(e) => setBlogTitle(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <div className="col-span-3">
            <Input id="image" placeholder="Enter image url" className={`w-full ${error ? "border-red-500" : ""}`} onChange={(e) => setImage(e.target.value)} />
            
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Content</Label>
            <div className="col-span-3">
            <Textarea placeholder="Enter content of blog" className={`w-full ${error ? "border-red-500" : ""}`} onChange={(e) => setContent(e.target.value)}/>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <AlertDialogComponent
          open={isAlertOpen}
          setOpen={setIsAlertOpen}
          handleOk={handleSubmit} />
            
          <Button
            type="submit"
            onClick={validateInput}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateBlog;
