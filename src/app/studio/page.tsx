import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import StudioApp from "@/components/studio/StudioApp";

export default function StudioPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-300" />
            </div>
          }
        >
          <StudioApp />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
