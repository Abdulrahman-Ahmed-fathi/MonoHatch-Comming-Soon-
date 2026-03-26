import SectionHeading from "./ui/SectionHeading";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function CollaborateSection() {
  return (
    <section id="collaborate" className="bg-blush px-4 py-16 md:px-8 md:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="Partner With MonoHatch" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-t-4 border-t-rose-400">
            <p className="text-3xl">🏥</p>
            <h3 className="mt-3 font-display text-2xl text-rose-900">For Doctors &amp; Healthcare Providers</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
              <li>Patient engagement opportunities</li>
              <li>Digital consultation access</li>
              <li>Visibility within a targeted health platform</li>
            </ul>
            <Button className="mt-5" href="#footer">Become a Partner</Button>
          </Card>
          <Card className="border-t-4 border-t-mauve">
            <p className="text-3xl">🤝</p>
            <h3 className="mt-3 font-display text-2xl text-rose-900">For Brands &amp; Communities</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
              <li>Women-focused brands</li>
              <li>Community initiatives</li>
              <li>Educational platforms</li>
            </ul>
            <Button className="mt-5" href="#footer">Collaborate With Us</Button>
          </Card>
          <Card className="border-t-4 border-t-plum">
            <p className="text-3xl">📈</p>
            <h3 className="mt-3 font-display text-2xl text-rose-900">For Investors</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
              <li>EdTech + HealthTech</li>
              <li>AI-driven personalization</li>
              <li>Community-based growth</li>
            </ul>
            <Button className="mt-5" href="mailto:hello@monohatch.com">Get in Touch</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
