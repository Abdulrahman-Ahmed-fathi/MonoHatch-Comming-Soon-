import Button from "./ui/Button";

export default function ClosingStatement() {
  return (
    <section className="bg-pearl px-4 py-16 text-center md:px-8 md:py-24 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="bg-gradient-to-r from-rose-500 to-plum bg-clip-text font-display text-5xl text-transparent">This is just the beginning.</h2>
        <p className="mt-6 text-xl text-gray-700">
          MonoHatch is more than a platform - It&apos;s a vision to transform how women understand, manage, and experience their health.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="#waitlist">Join the Waiting List</Button>
          <Button variant="secondary" href="#footer">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
