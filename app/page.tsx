"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  CheckCircle,
  FileText,
  BarChart3,
  PenTool,
  Download,
  Layers,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"

export default function Home() {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const featuresRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    handleResize()

    // Cambiar la característica activa cada 4 segundos
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [])

  // Valores transformados para animaciones basadas en scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100])

  // Valores para el efecto de parallax en las formas flotantes
  const shape1X = useTransform(scrollYProgress, [0, 1], [0, windowSize.width * 0.1])
  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, windowSize.height * 0.2])
  const shape2X = useTransform(scrollYProgress, [0, 1], [0, -windowSize.width * 0.15])
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, windowSize.height * 0.1])
  const shape3X = useTransform(scrollYProgress, [0, 1], [0, windowSize.width * 0.05])
  const shape3Y = useTransform(scrollYProgress, [0, 1], [0, -windowSize.height * 0.15])

  // Efecto de seguimiento del cursor para el botón principal
  const calculateButtonTransform = () => {
    if (!containerRef.current || windowSize.width === 0) return { x: 0, y: 0 }

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (mousePosition.x - centerX) / 20
    const distanceY = (mousePosition.y - centerY) / 20

    return { x: distanceX, y: distanceY }
  }

  const buttonTransform = calculateButtonTransform()

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-800 transition-colors duration-300 dark:bg-gradient-to-br dark:from-black dark:to-purple-950 dark:text-white">
      {/* Formas flotantes de fondo con efecto de brillo - solo visibles en modo oscuro */}
      <div className="dark:block hidden">
        <motion.div
          className="pointer-events-none absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 blur-3xl"
          style={{
            x: shape1X,
            y: shape1Y,
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]),
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="pointer-events-none absolute right-[15%] top-[25%] h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"
          style={{ x: shape2X, y: shape2Y }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[20%] left-[20%] h-80 w-80 rounded-full bg-gradient-to-r from-amber-600/20 to-pink-600/20 blur-3xl"
          style={{ x: shape3X, y: shape3Y }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Formas sutiles para modo claro */}
      <div className="dark:hidden block">
        <div className="pointer-events-none absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-gradient-to-r from-purple-200/30 to-amber-200/30 blur-3xl"></div>
        <div className="pointer-events-none absolute right-[15%] top-[25%] h-96 w-96 rounded-full bg-gradient-to-r from-stone-200/30 to-purple-100/30 blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-[20%] left-[20%] h-80 w-80 rounded-full bg-gradient-to-r from-amber-100/30 to-stone-200/30 blur-3xl"></div>
      </div>

      {/* Navbar con efecto glassmorphism mejorado */}
      <header className="fixed top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md transition-colors duration-300 dark:border-white/10 dark:bg-black/50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg dark:from-purple-500 dark:to-fuchsia-600"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">ResumeAI</span>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {["Características", "Plantillas", "Precios", "Blog"].map((item) => (
                <motion.li key={item} whileHover={{ y: -2 }}>
                  <a
                    href="#"
                    className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-white/80 dark:hover:text-white"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/resume-builder">
              <Button
                variant="outline"
                size="sm"
                className="border-stone-300 bg-white/80 text-stone-800 backdrop-blur-sm transition-all hover:bg-stone-100 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                Iniciar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section con diseño asimétrico mejorado */}
      <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center px-6">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-5">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYgMGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtLTE2IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00TTIwIDM0YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0xNi0xNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtLTE2IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNE0yMCAxOGMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtMCAxNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTQiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <Zap className="h-4 w-4 text-purple-600 dark:text-amber-400" />
            <span className="text-sm font-medium">Potenciado por IA avanzada</span>
          </div>

          <h1 className="mb-6 text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-stone-900 via-purple-800 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-purple-200 dark:to-fuchsia-200">
              Transforma tu carrera
              <br />
              con CVs inteligentes
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-stone-600 dark:text-white/70 md:text-xl">
            Crea CVs personalizados que destacan tus habilidades relevantes para cada oferta de trabajo y aumenta
            drásticamente tus posibilidades de conseguir entrevistas.
          </p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ x: buttonTransform.x, y: buttonTransform.y }}
          >
            <Link href="/resume-builder">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-purple-800 px-8 text-white shadow-xl transition-all hover:shadow-purple-500/25 dark:from-purple-600 dark:to-fuchsia-600"
              >
                <span className="relative z-10">Comenzar ahora</span>
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-700 to-purple-900 opacity-0 transition-opacity group-hover:opacity-100 dark:from-fuchsia-600 dark:to-purple-600"></span>
                <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-stone-300 bg-white/80 text-stone-800 backdrop-blur-sm transition-all hover:bg-stone-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Ver ejemplos
            </Button>
          </motion.div>

          {/* Estadísticas */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {[
              { value: "85%", label: "Tasa de entrevistas" },
              { value: "10K+", label: "CVs generados" },
              { value: "4.9/5", label: "Valoración media" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-purple-700 dark:text-white">{stat.value}</div>
                <div className="text-sm text-stone-500 dark:text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-1 text-stone-400 dark:text-white/50">
            <span className="text-sm">Descubre más</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>

        {/* Mockup flotante */}
        <motion.div
          className="absolute bottom-[-100px] right-[-100px] hidden h-[500px] w-[500px] opacity-20 md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={theme === "dark" ? "#FFFFFF" : "#6D28D9"}
              d="M45.3,-59.1C58.9,-51.1,70.2,-37.8,76.1,-22.1C82,-6.4,82.5,11.7,75.8,26.1C69.1,40.5,55.3,51.1,40.5,58.3C25.7,65.5,9.8,69.2,-5.9,67.1C-21.7,65,-37.3,57.1,-48.5,45.3C-59.7,33.5,-66.5,17.7,-68.3,0.7C-70.1,-16.3,-66.9,-34.7,-56.6,-43.9C-46.3,-53.1,-28.9,-53.1,-13.2,-57.5C2.5,-61.9,16.5,-70.7,31.7,-67.1C46.9,-63.5,63.3,-47.5,45.3,-59.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </motion.div>
      </section>

      {/* Sección de características con diseño de tarjetas flotantes mejorado */}
      <section ref={featuresRef} className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <motion.div
              className="mb-3 mx-auto inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium">Características exclusivas</span>
            </motion.div>

            <motion.h2
              className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2 }}
            >
              Características revolucionarias
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3 }}
            >
              Herramientas avanzadas que te ayudan a destacar en el competitivo mercado laboral
            </motion.p>
          </div>

          {/* Características destacadas con animación */}
          <div className="mb-24">
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-black/40 dark:backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-200/40 to-stone-200/40 blur-3xl dark:from-purple-600/20 dark:to-fuchsia-600/20"></div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg dark:from-purple-600 dark:to-fuchsia-600">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Análisis inteligente</h3>
                  </div>

                  <p className="mb-6 text-stone-600 dark:text-white/70">
                    Nuestro algoritmo analiza las ofertas de trabajo para identificar las palabras clave más relevantes
                    y te ayuda a optimizar tu CV para cada aplicación.
                  </p>

                  <ul className="space-y-2">
                    {[
                      "Extracción automática de palabras clave",
                      "Análisis de coincidencia con tu perfil",
                      "Sugerencias personalizadas",
                      "Optimización para sistemas ATS",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-stone-700 dark:text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <div className="flex flex-col gap-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-black/40 dark:backdrop-blur-sm"
                  >
                    <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-200/40 to-stone-200/40 blur-3xl dark:from-purple-600/20 dark:to-fuchsia-600/20"></div>

                    <div className="relative z-10">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg dark:from-purple-600 dark:to-fuchsia-600">
                        {features[activeFeature].icon}
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-white">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-stone-600 dark:text-white/70">{features[activeFeature].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <motion.button
                      key={index}
                      className={`rounded-xl border ${
                        activeFeature === index
                          ? "border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-900/20"
                          : "border-stone-200 bg-white hover:bg-stone-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                      } p-4 transition-colors`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            activeFeature === index ? "bg-purple-600" : "bg-stone-100 dark:bg-white/10"
                          }`}
                        >
                          {features[index].icon}
                        </div>
                        <span className="text-xs font-medium text-stone-800 dark:text-white">
                          {features[index].shortTitle}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Características adicionales */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.slice(3).map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:border-purple-200 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:border-purple-500/30 dark:hover:bg-white/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-200/20 to-stone-200/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100 dark:from-purple-600/20 dark:to-fuchsia-600/20"></div>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg dark:from-purple-600 dark:to-fuchsia-600">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-stone-900 dark:text-white">{feature.title}</h3>
                <p className="text-stone-600 dark:text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de plantillas */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100/50 to-transparent dark:from-purple-900/20 dark:to-transparent"></div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <motion.div
              className="mb-3 mx-auto inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/80 px-4 py-2 backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium">Diseños profesionales</span>
            </motion.div>

            <motion.h2
              className="mb-4 text-4xl font-bold tracking-tight text-stone-900 dark:text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.1 }}
            >
              Plantillas modernas y elegantes
            </motion.h2>

            <motion.p
              className="mx-auto max-w-2xl text-lg text-stone-600 dark:text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2 }}
            >
              Elige entre una variedad de diseños profesionales que destacarán tu perfil
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { name: "Minimalista", color: "from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800" },
                { name: "Moderno", color: "from-purple-400 to-purple-600 dark:from-fuchsia-600 dark:to-purple-800" },
                { name: "Creativo", color: "from-purple-300 to-purple-500 dark:from-blue-600 dark:to-purple-800" },
                { name: "Profesional", color: "from-purple-600 to-purple-800 dark:from-indigo-600 dark:to-purple-800" },
                { name: "Ejecutivo", color: "from-purple-700 to-purple-900 dark:from-violet-600 dark:to-purple-800" },
              ].map((template, index) => (
                <motion.div
                  key={index}
                  className="min-w-[280px] max-w-[280px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className={`h-64 bg-gradient-to-br ${template.color}`}>
                    <div className="h-full w-full p-6">
                      <div className="mb-4 h-6 w-24 rounded-full bg-white/20"></div>
                      <div className="mb-6 h-4 w-32 rounded-full bg-white/20"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-white/20"></div>
                        <div className="h-2 w-5/6 rounded-full bg-white/20"></div>
                        <div className="h-2 w-4/6 rounded-full bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-stone-900 dark:text-white">{template.name}</h3>
                    <p className="text-sm text-stone-500 dark:text-white/60">
                      Diseño{" "}
                      {index === 0
                        ? "simple y elegante"
                        : index === 1
                          ? "contemporáneo"
                          : index === 2
                            ? "único y llamativo"
                            : index === 3
                              ? "formal y estructurado"
                              : "sofisticado"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Indicadores de desplazamiento */}
            <div className="mt-6 flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === 0 ? "bg-purple-500" : "bg-stone-200 dark:bg-white/20"}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer con diseño minimalista */}
      <footer className="border-t border-stone-200 py-12 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-500 dark:to-fuchsia-600"></div>
              <span className="text-lg font-bold text-stone-900 dark:text-white">ResumeAI</span>
            </div>

            <div className="flex gap-8 text-sm text-stone-500 dark:text-white/70">
              {["Términos", "Privacidad", "Contacto", "Ayuda"].map((item) => (
                <a key={item} href="#" className="hover:text-stone-900 dark:hover:text-white">
                  {item}
                </a>
              ))}
            </div>

            <p className="text-sm text-stone-400 dark:text-white/50">© 2025 ResumeAI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Datos para las secciones
const features = [
  {
    title: "Análisis de ofertas con IA",
    shortTitle: "Análisis IA",
    description:
      "Nuestra IA analiza las ofertas de trabajo para identificar las habilidades y palabras clave más relevantes.",
    icon: <BarChart3 className="h-6 w-6 text-white" />,
  },
  {
    title: "Plantillas dinámicas",
    shortTitle: "Plantillas",
    description:
      "Diseños modernos y personalizables que se adaptan automáticamente a tu contenido y al tipo de trabajo.",
    icon: <Layers className="h-6 w-6 text-white" />,
  },
  {
    title: "Optimización de contenido",
    shortTitle: "Optimización",
    description: "Sugerencias inteligentes para mejorar la redacción y destacar tus logros de manera impactante.",
    icon: <PenTool className="h-6 w-6 text-white" />,
  },
  {
    title: "Cartas de presentación",
    description: "Genera cartas de presentación personalizadas que complementan perfectamente tu CV.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Seguimiento de aplicaciones",
    description: "Gestiona todas tus solicitudes de empleo en un solo lugar con recordatorios y estadísticas.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    title: "Exportación multiformato",
    description: "Descarga tu CV en PDF, Word o HTML, optimizado para sistemas de seguimiento de candidatos.",
    icon: <Download className="h-6 w-6 text-white" />,
  },
]

const testimonials = [
  {
    name: "Laura Martínez",
    position: "Diseñadora UX/UI",
    text: "Después de usar ResumeAI, conseguí 3 entrevistas en una semana. La capacidad de adaptar mi CV para cada oferta marcó una gran diferencia.",
  },
  {
    name: "Carlos Rodríguez",
    position: "Desarrollador Full Stack",
    text: "La herramienta de análisis de ofertas me ayudó a identificar exactamente qué habilidades destacar. Conseguí mi trabajo soñado en solo 2 semanas.",
  },
  {
    name: "Elena Gómez",
    position: "Gerente de Marketing",
    text: "Las plantillas son increíblemente profesionales y la IA realmente entiende cómo presentar la experiencia de manera impactante. ¡Totalmente recomendado!",
  },
  {
    name: "Javier López",
    position: "Analista de Datos",
    text: "La función de optimización de palabras clave me ayudó a superar los filtros ATS. Recibí llamadas para el 80% de las posiciones a las que apliqué.",
  },
  {
    name: "María Sánchez",
    position: "Consultora de RRHH",
    text: "Como profesional de recursos humanos, puedo decir que los CVs creados con esta herramienta realmente destacan entre cientos de aplicaciones.",
  },
]
