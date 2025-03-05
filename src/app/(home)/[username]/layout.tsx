import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function UserProfileLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <main className="max-w-5xl w-full">
      {children}
    </main>
  );
}
