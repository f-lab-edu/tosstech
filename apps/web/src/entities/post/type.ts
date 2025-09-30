import type { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  description: string;
  createAt: Timestamp;
  writer: {
    name: string;
  };
  thumbnailURL: string;
  type: "DEVELOP" | "DATA/ML" | "DESIGN" | "PRODUCT";
}

export interface PostDetail extends Post {
  writer: {
    name: string;
    position?: string;
  };
  data: string;
  otherPosts?: {
    id: string;
    title: string;
    createAt: string;
    thumbnailURL: string;
  }[];
  relatedPosts?: Post[];
}
