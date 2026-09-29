import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ConnectClient from "@/components/connect/ConnectClient";

export default function ConnectPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen">
        <ConnectClient />
      </main>
      <Footer />
    </>
  );
}
