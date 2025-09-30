import { db } from "@/firebase";
import { getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

import type { Post, PostDetail } from "./type";

export async function getPostList(): Promise<Post[]> {
  const querySnapshot = await getDocs(collection(db, "post"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data as Post[];
}

export async function getPostById(id: string): Promise<PostDetail | null> {
  const postRef = collection(db, "post");

  const q = query(postRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];

    return { id: doc.id, ...doc.data() } as PostDetail;
  } else {
    return null;
  }
}
