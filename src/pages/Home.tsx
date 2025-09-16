import { Template } from "@/components/layout/Template";
import { PostList } from "@/components/post";

export function Home() {
  return (
    <Template>
      <div className="w-full mt-6 mb-10 mx-auto flex flex-col items-center">
        <img
          className="w-[1000px] rounded-lg"
          src="https://resources-fe.toss.im/image-optimize/width=640,quality=75/https%3A%2F%2Fstatic.toss.im%2Fassets%2Fpayments%2Fcontents%2Ftoss-tech-banner2_.png"
          alt="banner"
        />
      </div>
      <PostList />
    </Template>
  );
}
