"use client"

import { motion } from "framer-motion"

interface ModernTemplateProps {
  personalInfo: any
  experience: any[]
  education: any[]
  skills: string[]
  keywordMatches: any[]
}

export default function ModernTemplate({
  personalInfo,
  experience,
  education,
  skills,
  keywordMatches,
}: ModernTemplateProps) {
  // Formatear fechas ISO a formato legible
  const formatDate = (isoString) => {
    if (!isoString) return ""
    const date = new Date(isoString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long" })
  }

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <motion.div
      className="grid overflow-hidden rounded-lg bg-white shadow-lg md:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Barra lateral */}
      <motion.div className="bg-purple-900 p-8 text-white" variants={itemVariants}>
        <div className="mb-8">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-purple-700">
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
              {personalInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
          <h1 className="mb-1 text-2xl font-bold">{personalInfo.name}</h1>
          <p className="text-purple-200">{experience[0]?.position || "Profesional"}</p>
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-purple-300">Contacto</h2>
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-300">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const isMatch = keywordMatches.some((match) => match.skill === skill && match.isMatch)
              return (
                <motion.span
                  key={index}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${
                    isMatch ? "bg-purple-700 text-white" : "bg-purple-800 text-purple-200"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {skill}
                  {isMatch && (
                    <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.span>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div className="col-span-2 p-8" variants={itemVariants}>
        {/* Experiencia */}
        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="mb-6 inline-block border-b-2 border-purple-600 pb-1 text-xl font-bold">Experiencia</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Actual"}
                  </span>
                </div>
                <p className="mb-2 font-medium text-purple-700">{exp.company}</p>
                {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Educación */}
        <motion.section variants={itemVariants}>
          <h2 className="mb-6 inline-block border-b-2 border-purple-600 pb-1 text-xl font-bold">Educación</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
                  {edu.graduationDate && (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                      {formatDate(edu.graduationDate)}
                    </span>
                  )}
                </div>
                {(edu.degree || edu.field) && (
                  <p className="font-medium text-purple-700">
                    {edu.degree} {edu.field && `en ${edu.field}`}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  )
}
