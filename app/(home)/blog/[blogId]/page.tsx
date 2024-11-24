"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { Blog, blogService } from "@/services/blog.service";

type Params ={
    blogId: string;
  };
const Page = () => {
    const params = useParams() as Params;
  const { blogId } = params;

  const parsedBlogId = parseInt(blogId, 10); 
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parsedBlogId) return; 

    const fetchBlogById = async () => {
      try {
        const response = await blogService.getBlogById(parsedBlogId);
        setBlog(response.data);
      } catch (error) {
        console.error("Failed to fetch Blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogById();
  }, [parsedBlogId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!blog) {
    return <div>Blog not found</div>; 
  }
  return (
    <div>
      {/* <h1>{blog.title} hello</h1> */}
      </div>
  )
}

export default Page