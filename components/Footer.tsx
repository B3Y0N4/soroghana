import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/40 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="font-display font-bold text-white/70">
          <span className="text-gold">Soro</span> Ghana
        </div>
        <p>&copy; {new Date().getFullYear()} Soro Ghana. Connecting Ghanaian talent with the world.</p>
        <div className="flex gap-5">
          <Link href="/browse" className="hover:text-white transition-colors">Find a Pro</Link>
          <Link href="/join" className="hover:text-white transition-colors">Start Earning</Link>
          <Link href="/post-job" className="hover:text-white transition-colors">Post a Job</Link>
        </div>
      </div>
    </footer>
  )
}
