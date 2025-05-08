"use client"

import { motion } from "framer-motion"

interface CreativeTemplateProps {
  personalInfo: any
  experience: any[]
  education: any[]
  skills: string[]
  keywordMatches: any[]
}

export default function CreativeTemplate({
  personalInfo,
  experience,
  education,
  skills,
  keywordMatches,
}: CreativeTemplateProps) {
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
      className="overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-white shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Encabezado con diseño creativo */}
      <motion.header
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-900 p-8 text-white"
        variants={itemVariants}
      >
        {/* Formas decorativas */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-500 opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-purple-400 opacity-20"></div>

        <div className="relative z-10">
          <motion.h1
            className="mb-2 text-4xl font-bold tracking-tight"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {personalInfo.name}
          </motion.h1>
          <motion.p
            className="mb-6 text-xl text-purple-200"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {experience[0]?.position || "Profesional"}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-6 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </motion.div>
        </div>
      </motion.header>

      <div className="p-8">
        {/* Habilidades con diseño creativo */}
        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-purple-600">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const isMatch = keywordMatches.some((match) => match.skill === skill && match.isMatch)
              return (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-lg px-4 py-2 ${
                    isMatch ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Elemento decorativo */}
                  <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white opacity-10"></div>
                  <span className="relative z-10 text-sm font-medium">{skill}</span>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Experiencia con línea de tiempo creativa */}
        <motion.section className="mb-10" variants={itemVariants}>
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-purple-600">Experiencia</h2>
          <div className="space-y-0">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="relative border-l-2 border-purple-200 pl-6 pb-8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Punto en la línea de tiempo */}
                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-purple-600"></div>

                {/* Fecha flotante */}
                <div className="absolute -left-32 top-0 w-24 text-right text-xs text-purple-500">
                  <span>{formatDate(exp.startDate)}</span>
                  <br />
                  <span>{exp.endDate ? formatDate(exp.endDate) : "Actual"}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <p className="mb-2 text-purple-600">{exp.company}</p>
                  {exp.description && <p className="text-sm text-gray-600">{exp.description}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Educación con diseño de tarjetas */}
        <motion.section variants={itemVariants}>
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-purple-600">Educación</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-lg border border-purple-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  {edu.graduationDate && (
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                      {formatDate(edu.graduationDate)}
                    </span>
                  )}
                </div>
                {(edu.degree || edu.field) && (
                  <p className="text-purple-600">
                    {edu.degree} {edu.field && `en ${edu.field}`}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
