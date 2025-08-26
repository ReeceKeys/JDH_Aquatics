export default function Blog() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="container mx-auto p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Blog</h1>
        <p className="text-yellow-400 mt-2 text-lg md:text-xl">
          Learn tips, tricks, and techniques for aquariums and aquatic life.
        </p>
      </section>

      <section className="container mx-auto p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">Top 5 Freshwater Fish</h3>
          <p className="text-yellow-400 mt-2">Discover the best fish for beginners and experts alike.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">Aquatic Plant Care</h3>
          <p className="text-yellow-400 mt-2">Tips for keeping your plants thriving and healthy.</p>
        </div>
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">Tank Setup Guide</h3>
          <p className="text-yellow-400 mt-2">Everything you need to set up a perfect aquarium.</p>
        </div>
      </section>
    </div>
  );
}
