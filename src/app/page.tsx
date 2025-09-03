import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-neutral-900">
              LinkUp
            </Link>
            <div className="flex gap-6">
              <Link href="/about" className="text-neutral-600 hover:text-neutral-900">
                About Us
              </Link>
              <Link href="/gallery" className="text-neutral-600 hover:text-neutral-900">
                Gallery
              </Link>
              <Link href="/social" className="text-neutral-600 hover:text-neutral-900">
                Social
              </Link>
              <Link href="/apply" className="text-neutral-600 hover:text-neutral-900">
                Join Us
              </Link>
              <Link href="/request" className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800">
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-neutral-900 mb-6">
            Welcome to LinkUp
          </h1>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Your trusted platform for connecting with verified, professional service providers
            in your area. We prioritize safety, discretion, and quality connections.
          </p>

          <div className="flex gap-6 justify-center mb-16">
            <Link
              href="/gallery"
              className="bg-neutral-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Browse Providers
            </Link>
            <Link
              href="/apply"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-4 rounded-lg text-lg font-medium hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Become a Provider
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Verified Providers</h3>
              <p className="text-neutral-600">
                All service providers undergo thorough verification to ensure safety and professionalism.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Secure Platform</h3>
              <p className="text-neutral-600">
                Your privacy and security are our top priority with encrypted communications.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Local Focus</h3>
              <p className="text-neutral-600">
                Connect with providers in your local area for convenient and timely services.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
