export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="container mx-auto p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-500">Contact JDH Aquatics</h1>
        <p className="text-yellow-400 mt-2 text-lg md:text-xl">
          Questions or inquiries? Reach out to us.
        </p>
      </section>

      <section className="container mx-auto p-8 max-w-md mx-auto">
        <form className="bg-gray-900 p-6 rounded shadow space-y-4">
          <div>
            <label className="block text-yellow-400 font-bold mb-2">Name</label>
            <input className="w-full p-2 rounded text-black" type="text" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-yellow-400 font-bold mb-2">Email</label>
            <input className="w-full p-2 rounded text-black" type="email" placeholder="Your Email" />
          </div>
          <div>
            <label className="block text-yellow-400 font-bold mb-2">Message</label>
            <textarea className="w-full p-2 rounded text-black" rows="4" placeholder="Your Message"></textarea>
          </div>
          <button className="w-full bg-orange-500 px-4 py-2 rounded font-bold hover:bg-yellow-400 text-black">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
