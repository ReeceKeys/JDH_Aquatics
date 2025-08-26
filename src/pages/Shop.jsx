export default function Shop() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="container mx-auto p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Shop</h1>
        <p className="text-yellow-400 mt-2 text-lg md:text-xl">
          Find the best aquarium gear and supplies curated by JDH Aquatics.
        </p>
      </section>

      <section className="container mx-auto p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">Aquarium Filters</h3>
          <p className="text-yellow-400 mt-2">Top quality filters for freshwater and saltwater tanks.</p>
          <button className="mt-4 bg-orange-500 px-4 py-2 rounded hover:bg-yellow-400 text-black font-bold">
            Buy Now
          </button>
        </div>
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">LED Lighting</h3>
          <p className="text-yellow-400 mt-2">Brighten your tank and support plant growth.</p>
          <button className="mt-4 bg-orange-500 px-4 py-2 rounded hover:bg-yellow-400 text-black font-bold">
            Buy Now
          </button>
        </div>
        <div className="bg-gray-900 p-6 rounded shadow hover:scale-105 transition transform">
          <h3 className="text-orange-500 font-bold text-xl">Aquarium Plants</h3>
          <p className="text-yellow-400 mt-2">Healthy plants to enhance your tank.</p>
          <button className="mt-4 bg-orange-500 px-4 py-2 rounded hover:bg-yellow-400 text-black font-bold">
            Buy Now
          </button>
        </div>
      </section>
    </div>
  );
}
