"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import { type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

type RevealProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView"> & {
    children: ReactNode
    direction?: Direction
    distance?: number
    delay?: number
    duration?: number
    once?: boolean
    amount?: number | "some" | "all"
    margin?: string
    as?: "div" | "section" | "ul" | "li" | "span" | "p"
}

const EASE = [0.22, 1, 0.36, 1] as const

function getOffset(direction: Direction, distance: number) {
    switch (direction) {
        case "up":
            return { x: 0, y: distance }
        case "down":
            return { x: 0, y: -distance }
        case "left":
            return { x: distance, y: 0 }
        case "right":
            return { x: -distance, y: 0 }
        default:
            return { x: 0, y: 0 }
    }
}

export function Reveal({
    children,
    direction = "up",
    distance = 24,
    delay = 0,
    duration = 0.7,
    once = true,
    amount = 0.2,
    margin = "-80px",
    ...rest
}: RevealProps) {
    const offset = getOffset(direction, distance)
    const variants: Variants = {
        hidden: { opacity: 0, ...offset },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, ease: EASE, delay },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount, margin }}
            variants={variants}
            {...rest}
        >
            {children}
        </motion.div>
    )
}

type StaggerProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView"> & {
    children: ReactNode
    stagger?: number
    delayChildren?: number
    once?: boolean
    amount?: number | "some" | "all"
    margin?: string
}

export function StaggerGroup({
    children,
    stagger = 0.1,
    delayChildren = 0,
    once = true,
    amount = 0.2,
    margin = "-80px",
    ...rest
}: StaggerProps) {
    const variants: Variants = {
        hidden: {},
        show: {
            transition: { staggerChildren: stagger, delayChildren },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount, margin }}
            variants={variants}
            {...rest}
        >
            {children}
        </motion.div>
    )
}

export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
    },
}
