import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/create-metadata";

export const metadata = createMetadata({
  title: "Home",
  description: "Home page",
  alternates: {
    canonical: "http://localhost:3000",
  },
});

export default function Home() {
  return (
    <div>
      <Button>abc</Button>
    </div>
  );
}
