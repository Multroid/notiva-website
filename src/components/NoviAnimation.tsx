"use client"

import { useRive } from "@rive-app/react-canvas"

export default function NoviAnimation() {
    const { RiveComponent } = useRive({
        src: "/animations/novi.riv",
        autoplay: true,
    })

    return <RiveComponent className="size-full" />
}
