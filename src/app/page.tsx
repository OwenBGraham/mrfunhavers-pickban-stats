import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">VALORANT Agent Draft Stats</h1>
        <div className="grid gap-8">
          <section className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Tournament Overview</h2>
            <p className="text-gray-400">Select a tournament to view detailed agent draft statistics.</p>
          </section>
          
          <section className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Recent Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tournament cards will go here */}
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium">Loading tournaments...</h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
