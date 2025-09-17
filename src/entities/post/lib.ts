import type { Post } from "./type";

export function typeToCode(type: Post["type"]): string {
  switch (type) {
    case "DEVELOP":
      return "개발";
    case "DATA/ML":
      return "데이터/ML";
    case "DESIGN":
      return "디자인";
    case "PRODUCT":
      return "프로덕트";
  }
}
