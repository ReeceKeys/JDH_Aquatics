export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="container mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
          About JDH Aquatics
        </h1>
        <p className="mt-4 text-yellow-400 text-lg md:text-xl">
          JDH Aquatics is dedicated to sharing knowledge about aquariums, fish, and aquatic plants. 
          Founded by Reece Harris, the site provides expert guides, tips, and resources for hobbyists of all levels.
        </p>
      </section>

      <section className="container mx-auto p-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded shadow">
          <h3 className="text-orange-500 font-bold text-xl">Mission</h3>
          <p className="text-yellow-400 mt-2">
            To educate and inspire aquarium enthusiasts while promoting sustainable aquatic practices.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded shadow">
          <h3 className="text-orange-500 font-bold text-xl">Vision</h3>
          <p className="text-yellow-400 mt-2">
            A global community of knowledgeable aquarium hobbyists who love and protect aquatic life.
          </p>
        </div>
      </section>
    </div>
  );
}
