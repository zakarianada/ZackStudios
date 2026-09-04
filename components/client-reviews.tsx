"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Quote } from "lucide-react";
import { useRef } from "react";
import { clientReviews, type ClientReview } from "@/lib/testimonials";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

function ReviewCard({ review, index }: { review: ClientReview; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 92%", "start 38%"],
  });
  const opacity = useTransform(scrollYProgress, [0, .55], [.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [.965, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.figure
      ref={cardRef}
      data-review-card
      style={{
        opacity: reducedMotion ? 1 : opacity,
        y: reducedMotion ? 0 : y,
        scale: reducedMotion ? 1 : scale,
      }}
      className="relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0e] p-6 md:min-h-[26rem] md:p-9"
    >
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reducedMotion ? 1 : lineScale, transformOrigin: "top" }}
        className="absolute inset-y-0 left-0 w-px bg-[#ff3439]"
      />
      <div className="flex items-center justify-between">
        <Quote className="size-7 text-[#ff3439]" aria-hidden="true" />
        <span className="text-[10px] font-semibold tracking-[.2em] text-white/28">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <blockquote className="mt-9 flex-1 text-[clamp(1.35rem,3vw,2.25rem)] font-medium leading-[1.35] tracking-[-.025em] text-white/88">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-9 border-t border-white/10 pt-5">
        <p className="text-sm font-semibold">{review.client}</p>
        {review.context && <p className="mt-1 text-xs leading-5 text-white/48">{review.context}</p>}
        {review.sourceUrl && (
          <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-white/65 transition hover:text-white">
            Read original review <ArrowUpRight className="size-3.5 text-[#ff3439]" />
          </a>
        )}
      </figcaption>
    </motion.figure>
  );
}

function ScrollingReviews({ reviews }: { reviews: ClientReview[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="reviews" aria-labelledby="reviews-heading" className="relative overflow-clip border-y border-white/10 bg-[#0b0b0c] py-24 md:py-32">
      <div className="site-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-48 top-1/4 size-[34rem] rounded-full bg-[#ff262c]/7 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 md:px-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ff3439]">05 / Client Reviews</p>
          <h2 id="reviews-heading" className="display-font mt-4 text-[clamp(4rem,8vw,7.5rem)] font-black uppercase leading-[.8]">
            In their<br /><span className="text-[#ff3439]">words.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/48">
            Feedback from collaborators and clients, revealed as you move through the work.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.16em] text-white/38">
            <ArrowDown className="size-3.5 text-[#ff3439]" aria-hidden="true" /> Scroll to read
          </div>
          <div className="mt-8 hidden h-28 w-px overflow-hidden bg-white/10 lg:block" aria-hidden="true">
            <motion.div style={{ scaleY: reducedMotion ? 1 : progress, transformOrigin: "top" }} className="h-full w-full bg-[#ff3439]" />
          </div>
        </div>
        <div className="space-y-5 md:space-y-8">
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.client}-${review.quote}`} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClientReviews() {
  if (clientReviews.length === 0) return null;
  return <ScrollingReviews reviews={clientReviews} />;
}
