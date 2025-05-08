"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import lottie, { type AnimationItem } from "lottie-web"

interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  className?: string
  style?: React.CSSProperties
  width?: number | string
  height?: number | string
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
  width = "100%",
  height = "100%",
}) => {
  const animationContainer = useRef<HTMLDivElement>(null)
  const anim = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!animationContainer.current) return

    // Cargar la animación
    anim.current = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
    })

    // Limpiar al desmontar
    return () => {
      if (anim.current) {
        anim.current.destroy()
      }
    }
  }, [animationData, loop, autoplay])

  return (
    <div
      ref={animationContainer}
      className={className}
      style={{
        width,
        height,
        ...style,
      }}
    />
  )
}

export default LottieAnimation
