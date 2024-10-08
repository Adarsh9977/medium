import { BlogSkeleton } from "../components/BlogSkeleton";
import { Fullblog } from "../components/Fullblog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const {loading,blog} = useBlog({
    id : Number(id)
  });

  if(loading){
    return <div className="flex justify-center">
      <div className="w-full max-w-screen-lg">
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      </div>
    </div>
  }

  return (
    <div>
      <Fullblog blog={blog}/>
    </div> 
  )
}

