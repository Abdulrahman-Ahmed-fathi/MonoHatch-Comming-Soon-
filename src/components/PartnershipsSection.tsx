import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";

export default function PartnershipsSection() {
  return (
    <section id="partnerships" className="bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Our Strategic Partners" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card hover className="border-rose-100">
            <img src="/src/assets/TSALEX Logo.png" alt="TSALEX Logo" className="h-20 w-auto object-contain" />
            <h3 className="mt-4 font-display text-2xl text-rose-900">TSALEX</h3>
            <p className="mt-2 text-gray-600">Strategic collaboration combining expertise to deliver cutting-edge solutions.</p>
          </Card>
          <Card hover className="border-rose-100">
            <h3 className="font-display text-2xl text-rose-900">Techne Summit 2025</h3>
            <p className="mt-2 text-gray-600">Strategic collaboration combining expertise to deliver cutting-edge solutions.</p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>📅 September 29 - October 6, 2025</li>
              <li>📍 Cairo &amp; Alexandria, Egypt</li>
              <li>👥 60,000+ innovators and investors</li>
              <li>
                🔗{" "}
                <a className="text-rose-600 underline" href="https://technesummit.com/2025" target="_blank" rel="noreferrer">
                  https://technesummit.com/2025
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
