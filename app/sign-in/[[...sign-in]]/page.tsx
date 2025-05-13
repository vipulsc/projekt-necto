import BgGradient from "@/components/styling-component/bgGradient";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center lg:min-h-[40vh] ">
      <div className="py-12 lg:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <BgGradient>
          <SignIn />
        </BgGradient>
      </div>
    </section>
  );
}
