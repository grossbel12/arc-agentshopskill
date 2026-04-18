import { Header } from "@/components/Header";
import { ListingUploader } from "@/components/ListingUploader";

export default function ListSkillPage() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <ListingUploader />
      </main>
    </div>
  );
}
