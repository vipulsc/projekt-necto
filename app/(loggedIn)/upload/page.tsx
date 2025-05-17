import BgGradient from "@/components/styling-component/bgGradient";
import UploadForm from "@/components/upload/upload-form";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const uploadPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default uploadPage;
