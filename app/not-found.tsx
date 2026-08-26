import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center px-5 text-center"><div><p className="text-[10px] uppercase tracking-[.2em] text-[#ff3439]">404 / Missing project</p><h1 className="display-font mt-3 text-7xl font-black uppercase">Not found.</h1><p className="mt-4 text-sm text-white/50">This project does not exist or has moved.</p><Link href="/work" className="mt-7 inline-block rounded-sm bg-[#ff262c] px-5 py-3 text-xs font-semibold uppercase tracking-[.12em]">Back to work</Link></div></main>;
}
