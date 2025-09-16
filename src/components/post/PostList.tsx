import { useEffect, useState } from "react";

import { useNavigate } from "@/router/hooks";

import { getPostList, type Post } from "@/entities/post";

export function PostList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPostList().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
      <div className="max-w-[650px] mx-auto">
        {posts.length !== 0 &&
          posts.map((post) => (
            <div
              key={post.id}
              className=" flex justify-between items-start gap-5 py-6 cursor-pointer"
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              <div className="flex flex-col">
                <h4 className="text-lg font-bold mb-[6px]">{post.title}</h4>
                <p className="text-sm text-gray-500 mb-[18px]">
                  {post.description}
                </p>
                <span className="text-xs text-gray-500">
                  {post.writer.name}·
                  {post.createAt.toDate().toLocaleDateString()}
                </span>
              </div>
              <img
                src={post.thumbnailURL}
                alt={post.title + "thumbnail"}
                className="w-[130px] h-[90px] rounded-lg"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
