import { Template } from "@/components/layout/Template";
import { getPostById, type PostDetail } from "@/entities/post";
import { useParams } from "@/router/hooks";
import { useEffect, useState } from "react";

export function Post() {
  const { id } = useParams();
  const [data, setData] = useState<PostDetail | null>(null);

  useEffect(() => {
    getPostById(id).then((data) => {
      setData(data);
    });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <Template>
      <div className="max-w-[700px] mx-auto flex flex-col gap-5 pt-[35px]">
        <img
          src={data.thumbnailURL}
          alt={data.title}
          className="object-cover rounded-lg"
        />
        <h1 className="font-bold text-5xl">{data.title}</h1>
        <div className="flex flex-col gap-1">
          <span className="text-md font-bold">
            {data.writer.name}·{data.writer.position}
          </span>
          <span className="text-sm text-gray-500">
            {data.createAt.toDate().toLocaleDateString()}
          </span>
        </div>
        <p className="text-md mt-[54px]">{data.data}</p>
      </div>
    </Template>
  );
}
