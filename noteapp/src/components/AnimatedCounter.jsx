import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function AnimatedCounter({ value = 0, duration = 0.6, className = "" }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const prevValue = useRef(0);

    useEffect(() => {
        const controls = animate(count, value, {
            duration,
            ease: "easeOut",
        });
        prevValue.current = value;
        return controls.stop;
    }, [value]);

    return <motion.h1 className={className}>{rounded}</motion.h1>;
}