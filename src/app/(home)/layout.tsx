import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function HomeLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="max-w-7xl w-full">
          {children}
        </main>
      </div>
    </>
  );
}
