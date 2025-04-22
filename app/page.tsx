import { Button } from "@/components/ui/button";
import { TestError } from "@/components/test-error";
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
      <h1>首页内容</h1>
      <TestError />
    </div>
  );
}
