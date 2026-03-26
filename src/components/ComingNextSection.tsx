import SectionHeading from "./ui/SectionHeading";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function ComingNextSection() {
  return (
    <section id="coming-next" className="bg-gradient-to-r from-rose-900 to-plum px-4 py-16 text-white md:px-8 md:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="What's Coming Next" />
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-gray-800 shadow-2xl">
          <Badge>Coming Soon</Badge>
          <h3 className="mt-4 font-display text-3xl text-rose-700">Our First Workshop</h3>
          <p className="mt-3">A powerful, interactive experience designed to help girls:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-rose-500">
            <li>Build confidence</li>
            <li>Join a supportive community</li>
            <li>Learn about personal growth and empowerment</li>
            <li>Take steps toward independence and self-development</li>
            <li>Learn about your physical and mental health to reach the optimum level</li>
          </ul>
          <p className="mt-5 italic text-rose-400">Stay tuned - registration opening soon</p>
          <div className="mt-6">
            <Button href="#newsletter">Notify Me</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
