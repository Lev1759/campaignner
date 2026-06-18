import Navbar from "@/components/landing/Navbar";

function Candidatelayout({ children }: any) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-zinc-100 flex flex-col md:flex-row">
      <Navbar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Candidatelayout;
