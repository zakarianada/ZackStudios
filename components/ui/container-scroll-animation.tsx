"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [8, 0] : [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.92, 1] : [1.045, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -40] : [0, -90]);

  return (
    <div className="relative flex h-[44rem] items-center justify-center px-3 md:h-[72rem] md:px-16" ref={containerRef}>
      <div className="relative w-full py-10 md:py-36" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>{children}</Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => (
  <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{ rotateX: rotate, scale, boxShadow: "0 10px 60px rgba(0,0,0,.5), 0 50px 120px rgba(0,0,0,.36)" }}
    className="mx-auto mt-3 h-auto w-full max-w-5xl rounded-[18px] border border-white/15 bg-[#111] p-1.5 shadow-2xl md:-mt-10 md:h-[38rem] md:rounded-[28px] md:p-4"
  >
    <div className="aspect-video h-auto w-full overflow-hidden rounded-[13px] border border-white/8 bg-black md:aspect-auto md:h-full md:rounded-[20px]">{children}</div>
  </motion.div>
);
