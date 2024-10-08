import { Link } from "react-router-dom";

interface BlogCardProps{
    id:            number;
    authorName:    string;
    title:         string;
    content:       string;
    publishedDate: string;     
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} >
        <div className="p-4 border-b-2 border-slate-200 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar size="small" name={authorName}/>
                </div>
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName} 
                </div>
                <div className="flex flex-col justify-center p-2">
                    <Circle/>
                </div>
                <div className=" font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="font-thin text-md ">
                {content.slice(0,100)+ "..."}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute(s) read`}
            </div>
        </div>
    </Link>
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({name, size="small"}: {name:string, size:"small"| "big"}){
    return  <div className={`relative inline-flex items-center justify-center ${size==="small"? "w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-600 rounded-full`}>
    <span className={`font-medium uppercase text-gray-200 ${size==="small"? "text-s": "font-bold text-2xl"}`}>{name[0]}</span>
</div>
}

