import logoSVG from "@/assets/logo.svg";
import linkSVG from "@/assets/link.svg";
import magnifyingGlassSVG from "@/assets/magnifyingGlass.svg";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="w-full max-w-[1140px] h-[60px] mx-auto flex justify-between items-center bg-white">
      <img src={logoSVG} className="h-5 w-[120px]" />
      <div className="flex items-center">
        <div className="mx-2 flex gap-[6px] items-center">
          <Button variant="link">
            <span>SLASH</span>
            <img src={linkSVG} className="h-5 w-5" />
          </Button>
        </div>
        <div className="mx-2 flex gap-[6px] items-center">
          <Button variant="link">
            <span>SIMPLICITY</span>
            <img src={linkSVG} className="h-5 w-5" />
          </Button>
        </div>
        <div className="ml-2">
          <Button variant="default">구독하기</Button>
        </div>
        <div className="ml-2">
          <Button variant="gray">채용 바로가기</Button>
        </div>
        <div className="mx-2">
          <Button variant="destructive">
            <img src={magnifyingGlassSVG} className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
