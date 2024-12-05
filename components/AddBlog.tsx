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
import { Textarea } from "@/components/ui/textarea";
import { AlertDialogComponent } from "./Alert";
import { blogService } from "@/services/blog.service";
import { toast } from "react-hot-toast";

export function AddBlog({ fetchdata }: { fetchdata: () => void }) {
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
      toast.error("Please fill all the fields");
      return false;
    }

    if (content.length > 5000) {
      toast.error("Blog content must be at least 5000 characters long.");
      return false;
    }
    if (image.length > 500) {
      toast.error("Image url must be at least 500 characters long.");
      return false;
    }
    setIsAlertOpen(true);
    return true;
  };
  const handleSubmit = async () => {
    if (!validateInput()) return; // Stop if validation fails

    const formData = {
      title: blogTitle,
      imageUrl: image,
      content: content,
    };

    setLoading(true);
    try {
      const response = await blogService.createBlog(formData);
      console.log("Response:", response.data);
      toast.success("Blog added successfully!");
      fetchdata();
    } catch (error) {
      toast.error("Error adding blog. Please try again. "+error);
    } finally {
      setImage("");
      setContent("");
      setBlogTitle("");
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
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
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-semibold mt-1 bg-gray-500 hover:bg-gray-600 hover:text-gray-200 text-white py-2 px-4 rounded focus:border-black"
        >
          Add Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">Add Blog</DialogTitle>
          <DialogDescription>
            Enter the blog details below and click save to add the blogs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Blog Title
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                placeholder="Enter blog title"
                className={`w-full ${error ? "border-red-500" : ""}`}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="col-span-3">
              <Input
                id="image"
                placeholder="Enter image url"
                className={`w-full ${error ? "border-red-500" : ""}`}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <div className="col-span-3">
              <Textarea
                placeholder="Enter content of blog"
                className={`w-full ${error ? "border-red-500" : ""}`}
                onChange={(e) => setContent(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>
        </div>
        <DialogFooter>
          <AlertDialogComponent
            open={isAlertOpen}
            setOpen={setIsAlertOpen}
            handleOk={handleSubmit}
          />

          <Button
            type="submit"
            onClick={validateInput}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Saving..." : "Add Blog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBlog;
