export const sampleData = {
  personal: {
    name: "Alejandro Silva González",
    title: "Desarrollador de Software & Líder Técnico",
    email: "alejandro.silva@email.com",
    phone: "+56 9 8765 4321",
    location: "Santiago, Chile",
    website: "https://asilva.dev",
    linkedin: "linkedin.com/in/alejandrosilvadev",
    github: "github.com/asilva-codes",
    photo: "", // Base64 data URL
    summary: "Ingeniero de Software Senior con más de 7 años de experiencia diseñando y construyendo aplicaciones web robustas y escalables. Especializado en arquitectura de microservicios, tecnologías JavaScript (Node.js, React) y computación en la nube (AWS). Apasionado por liderar equipos técnicos de alto rendimiento, optimizar el rendimiento de código y resolver problemas complejos de negocio con soluciones tecnológicas de vanguardia."
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Solutions Global",
      role: "Líder Técnico de Desarrollo",
      location: "Santiago (Híbrido)",
      start: "03/2022",
      end: "Presente",
      desc: "• Lidero un equipo de 6 desarrolladores frontend y backend para la modernización de la plataforma principal SaaS de la empresa, logrando un aumento del 40% en la velocidad del sitio.\n• Diseñé la arquitectura migrando de un monolito a microservicios basados en Node.js, Express y AWS Lambda.\n• Implementé pipelines de CI/CD avanzados que redujeron los tiempos de despliegue en un 60%."
    },
    {
      id: "exp-2",
      company: "Innovación Digital SpA",
      role: "Desarrollador Full-Stack Senior",
      location: "Remoto",
      start: "08/2019",
      end: "02/2022",
      desc: "• Desarrollé e implementé más de 12 dashboards web interactivos de alta complejidad con React, TypeScript y Tailwind CSS.\n• Optimicé consultas de bases de datos PostgreSQL, mejorando los tiempos de respuesta del API en un 35%.\n• Colaboré activamente con diseñadores UX/UI para traducir mockups de Figma en componentes interactivos reutilizables."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Universidad de Chile",
      degree: "Ingeniería Civil en Computación",
      field: "Tecnologías de la Información",
      location: "Santiago, Chile",
      start: "2013",
      end: "2018",
      desc: "Graduado con distinción máxima. Ayudante de cátedra de Estructuras de Datos y Algoritmos."
    }
  ],
  skills: [
    { id: "sk-1", name: "JavaScript / TypeScript", level: "5", category: "Lenguajes" },
    { id: "sk-2", name: "Node.js (NestJS, Express)", level: "5", category: "Backend" },
    { id: "sk-3", name: "React / Next.js", level: "5", category: "Frontend" },
    { id: "sk-4", name: "AWS (S3, Lambda, RDS)", level: "4", category: "Cloud & DevOps" },
    { id: "sk-5", name: "Bases de Datos (PostgreSQL, MongoDB)", level: "4", category: "Datos" },
    { id: "sk-6", name: "Arquitectura de Software", level: "4", category: "Metodologías" }
  ],
  projects: [
    {
      id: "proj-1",
      name: "SaaS Task Manager",
      role: "Creador & Desarrollador Principal",
      link: "https://github.com/asilva-codes/task-manager",
      stack: "React, Node.js, Socket.io, Redis",
      desc: "Aplicación de gestión de tareas colaborativa en tiempo real. Soporta edición simultánea, chat integrado y notificaciones push. Utiliza WebSockets para la comunicación instantánea."
    },
    {
      id: "proj-2",
      name: "Open Source UI Library",
      role: "Mantenedor",
      link: "https://github.com/asilva-codes/clean-ui",
      stack: "TypeScript, CSS, Storybook",
      desc: "Biblioteca de componentes de UI minimalistas, accesibles y personalizables con excelente soporte de teclado y accesibilidad WAI-ARIA. Cuenta con más de 1,500 estrellas en GitHub."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2024",
      link: ""
    },
    {
      id: "cert-2",
      title: "Scrum Alliance Certified ScrumMaster (CSM)",
      issuer: "Scrum Alliance",
      date: "2023",
      link: ""
    }
  ],
  languages: [
    { id: "lang-1", name: "Español", level: "Nativo" },
    { id: "lang-2", name: "Inglés", level: "Avanzado (C1)" }
  ],
  custom: {
    title: "Áreas de Interés y Voluntariado",
    items: [
      {
        id: "cust-1",
        title: "Mentor Técnico en CodeChile",
        desc: "Mentor voluntario enseñando programación básica y desarrollo web a jóvenes en situación de vulnerabilidad social."
      },
      {
        id: "cust-2",
        title: "Inteligencia Artificial & Ciberseguridad",
        desc: "Participación en hackathons locales y experimentación constante con LLMs y agentes autónomos de codificación."
      }
    ]
  },
  settings: {
    template: "modern",
    font: "font-inter",
    accentColor: "#2563eb",
    spacing: "space-normal"
  }
};
