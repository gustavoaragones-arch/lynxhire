"use client";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const features = [
  "Find verified candidates, not resume spam",
  "Post jobs in 3 minutes with AI assistance",
  "Hire faster with smart candidate ranking",
];

const testimonials = [
  { image: "/images/kishore_gunnam.jpg", className: "top-20 right-12" },
  { image: "/images/manu_arora.jpg", className: "top-40 right-32" },
  { image: "/images/person3.png", className: "top-60 right-16" },
  { image: "/images/person4.png", className: "top-80 right-28" },
  { image: "/images/person5.png", className: "top-96 right-20" },
  { image: "/images/person4.png", className: "top-80 right-28" },
  { image: "/images/kishore_gunnam.jpg", className: "top-20 right-12" },
  { image: "/images/manu_arora.jpg", className: "top-40 right-32" },
];

export function Testimonials() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 px-4">
            <h2 className="text-4xl font-semibold">
              <span className="text-[#FF6B2B]">People</span> Love Us
            </h2>

            <p className="text-neutral-600 text-lg max-w-md">
            Canadian employers and job seekers love us for our AI-powered matching.
            Even though the platform is new, we're already helping businesses find
            quality candidates and workers land their next role faster.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF6B2B]/10 flex items-center justify-center">
                    <IconCheck className="w-3 h-3 text-[#FF6B2B]" />
                  </div>
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-neutral-900 text-white px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
              Get Started
            </Button>
          </div>

          {/* Right Side - Orbiting Avatars */}
          <div className="relative h-[600px] overflow-hidden">
            <OrbitingIcons
              centerIcon={
                <div className="p-4 overflow-hidden z-20 flex items-center justify-center rounded-[15px] border-[1.5px] border-[#F3F3F3] bg-gradient-to-br from-[#FBFBFB] via-[#FBFBFB] to-[#E8E8E8] shadow-[0px_123px_35px_0px_rgba(0,0,0,0.00),_0px_79px_32px_0px_rgba(0,0,0,0.01),_0px_44px_27px_0px_rgba(0,0,0,0.05),_0px_20px_20px_0px_rgba(0,0,0,0.09),_0px_5px_11px_0px_rgba(0,0,0,0.10)]">
                  <Image
                    src="/logo-icon.png"
                    alt="LynxHire"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              }
              orbits={[
                {
                  icons: testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-[120px] h-[120px] overflow-hidden rounded-[133px] bg-gray-400 bg-cover bg-center bg-no-repeat shadow-[0px_44px_12px_0px_rgba(0,0,0,0.00),_0px_28px_11px_0px_rgba(0,0,0,0.03),_0px_16px_10px_0px_rgba(0,0,0,0.11),_0px_7px_7px_0px_rgba(0,0,0,0.19),_0px_2px_4px_0px_rgba(0,0,0,0.22)]"
                    >
                      <Image
                        src={testimonial.image}
                        alt={`Testimonial ${index + 1}`}
                        width={220}
                        height={220}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )),
                  radius: 180,
                  speed: 25,
                },
              ]}
              className="w-full h-full ml-20"
            />
            <div className="absolute inset-0 z-10 w-full h-full bg-gradient-to-l from-white via-white/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

const OrbitingIcons = ({
  centerIcon,
  orbits,
  className,
}: {
  centerIcon?: React.ReactNode;
  orbits: Array<{
    icons: React.ReactNode[];
    radius?: number;
    speed?: number;
    rotationDirection?: "clockwise" | "anticlockwise";
  }>;
  className?: string;
}) => {
  const orbitData = React.useMemo(() => {
    return orbits.map((orbit, orbitIndex) => {
      const radius = orbit.radius || 100 + orbitIndex * 80;
      const speed = orbit.speed || 1;
      const iconCount = orbit.icons.length;

      const angleStep = 360 / iconCount;
      const angles = Array.from({ length: iconCount }, (_, i) => angleStep * i);

      const iconData = angles.map((angle) => {
        const rotationAngle =
          orbit.rotationDirection === "clockwise"
            ? [angle, angle - 360]
            : [angle, angle + 360];

        return {
          angle,
          rotationAngle,
          position: {
            x: radius * Math.cos((angle * Math.PI) / 180),
            y: radius * Math.sin((angle * Math.PI) / 180),
          },
          animation: {
            initial: {
              rotate: angle,
              scale: 1,
              opacity: 1,
            },
            animate: {
              rotate: rotationAngle,
              scale: 1,
              opacity: 1,
            },
            transition: {
              rotate: {
                duration: speed,
                repeat: Infinity,
                ease: "linear",
              },
            },
            counterRotation: {
              initial: { rotate: -angle },
              animate: {
                rotate:
                  orbit.rotationDirection === "clockwise"
                    ? [-angle, -angle + 360]
                    : [-angle, -angle - 360],
              },
              transition: {
                duration: speed,
                repeat: Infinity,
                ease: "linear",
              },
            },
          },
        };
      });

      return {
        radius,
        speed,
        iconData,
        rotationDirection: orbit.rotationDirection,
      };
    });
  }, [orbits]);

  return (
    <div className={cn("relative", className)}>
      {centerIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {centerIcon}
        </div>
      )}
      {orbitData.map((orbit, orbitIndex) => (
        <div
          key={orbitIndex}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: orbits.length - orbitIndex }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: orbit.radius * 2 + "px",
              height: orbit.radius * 2 + "px",
            }}
          />

          {orbit.iconData.map((icon, iconIndex) => (
            <motion.div
              key={iconIndex}
              className="absolute"
              style={{
                width: "40px",
                height: "40px",
                left: `calc(50% - 20px)`,
                top: `calc(50% - 20px)`,
                transformOrigin: "center center",
              }}
              initial={icon.animation.initial}
              animate={icon.animation.animate}
              transition={icon.animation.transition}
            >
              <div
                style={{
                  position: "absolute",
                  left: `${orbit.radius}px`,
                  transformOrigin: "center center",
                }}
              >
                <motion.div
                  initial={icon.animation.counterRotation.initial}
                  animate={icon.animation.counterRotation.animate}
                  transition={icon.animation.counterRotation.transition}
                >
                  {orbits[orbitIndex].icons[iconIndex]}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};
