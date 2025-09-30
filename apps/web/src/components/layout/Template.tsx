import { Footer } from "./Footer";
import Header from "./Header";

export function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full max-w-[1140px] h-full mx-auto">
        <div className="w-full max-w-[1140px] fixed top-0">
          <Header />
        </div>
        <div className="pt-[60px]">{children}</div>
      </div>
      <Footer />
    </>
  );
}
