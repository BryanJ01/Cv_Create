"use client"

import { motion } from "framer-motion"

interface MinimalTemplateProps {
  personalInfo: any
  experience: any[]
  education: any[]
  skills: string[]
  keywordMatches: any[]
}

export default function MinimalTemplate({
  personalInfo,
  experience,
  education,
  skills,
  keywordMatches,
}: MinimalTemplateProps) {
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
      className="rounded-lg bg-white p-8 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Encabezado */}
      <motion.header className="mb-8 border-b border-gray-100 pb-6" variants={itemVariants}>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
      </motion.header>

      {/* Habilidades */}
      <motion.section className="mb-8" variants={itemVariants}>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-600">Habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            const isMatch = keywordMatches.some((match) => match.skill === skill && match.isMatch)
            return (
              <motion.span
                key={index}
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
                  isMatch ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {skill}
                {isMatch && (
                  <svg className="ml-1 h-3 w-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
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
      </motion.section>

      {/* Experiencia */}
      <motion.section className="mb-8" variants={itemVariants}>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-600">Experiencia</h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="relative border-l border-gray-200 pl-6"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-purple-600"></div>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Actual"}
                </span>
              </div>
              <p className="mb-1 text-gray-700">{exp.company}</p>
              {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Educación */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-600">Educación</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative border-l border-gray-200 pl-6"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-purple-600"></div>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-gray-900">{edu.institution}</h3>
                {edu.graduationDate && <span className="text-sm text-gray-500">{formatDate(edu.graduationDate)}</span>}
              </div>
              {(edu.degree || edu.field) && (
                <p className="text-gray-700">
                  {edu.degree} {edu.field && `en ${edu.field}`}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
