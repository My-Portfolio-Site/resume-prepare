export const profile = {
    id: '1',
    user_id: '1',
    first_name: 'John',
    last_name: 'Doe',
    headline: 'Senior Software Engineer',
    summary: 'Experienced software engineer with a passion for building scalable applications.',
    about_me: 'I love coding and solving complex problems.',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Tech Street',
    country: 'United States',
    postal_code: '12345',
    linkedin_url: 'https://linkedin.com/in/johndoe',
    github_url: 'https://github.com/johndoe',
    portfolio_url: 'https://johndoe.dev',
    languages: ['English', 'Spanish'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
export const experiences = [
  {
    id: "exp-001",
    user_id: "user-7263",
    is_current: true,
    summary: "Full-stack developer working with Angular and Java. Working for the iShares platform",
    title: "Associate Software Developer",
    start_month: 11,
    start_year: 2017,
    end_month: null,
    end_year: null,
    company_name: "BlackRock",
    company_location: "London, UK",
    company_industry: "Financial Services",
    achievements: [
      "Improved application performance by 40% through optimization",
      "Led team of 3 developers in new feature development",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ],
    technologies: [
      "Angular 12",
      "Java 11",
      "Spring Boot",
      "PostgreSQL",
      "AWS"
    ],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "exp-002",
    user_id: "user-7263",
    is_current: false,
    summary: "Full-stack developer working with React and Node.js",
    title: "Junior Software Developer",
    start_month: 11,
    start_year: 2017,
    end_month: 11,
    end_year: 2019,
    company_name: "BlackRock",
    company_location: "London, UK",
    company_industry: "Financial Services",
    achievements: [
      "Improved application performance by 40% through optimization",
      "Led team of 3 developers in new feature development",
      "Implemented CI/CD pipeline reducing deployment time by 60%"
    ],
    technologies: [
      "Angular 12",
      "Java 11",
      "Spring Boot",
      "PostgreSQL",
      "AWS"
    ],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  }
];

export const education = [
  {
    id: "edu-001",
    user_id: "user-7263",
    is_current: true,
    degree: "BTech",
    field_of_study: "Computer Science",
    percentage: 62,
    cgpa: 2.3,
    school_name: "Aditya Engineering College",
    university: "JNTUK",
    address: "Surampalem, Andhra Pradesh, India",
    start_month: 8,
    start_year: 2012,
    end_month: 8,
    end_year: 2013,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z"
  }
];

// Combined accomplishments array with type discrimination
export const skills = [
  {
    id: "skill-001",
    user_id: "user-7263",
    type: 'skill' as const,  // explicitly type as const
    name: 'Automation',
    skills: [],
    created_at: "2023-01-01T00:00:00Z"
  },
  {
    id: "skill-001",
    user_id: "user-7263",
    type: 'skill' as const,  // explicitly type as const
    name: 'Frontend',
    skills: ["Angular", "TypeScript", "RxJS"],
    created_at: "2023-01-01T00:00:00Z"
  },
]
export const certifications = [
  {
    id: "cert-001",
    user_id: "user-7263",
    type: "certification" as const,
    issuer: "Oracle",
    name: "Oracle Certified Expert",
    skills: ["Java", "Oracle DB"],
    completed: "2022-12-01",
    credential_id: "OCE123456",
    created_at: "2023-01-01T00:00:00Z"
  },
]
export const courses = [
  {
    id: "course-001",
    user_id: "user-7263",
    type: "course" as const,
    issuer: "Coursera",
    name: "Full Stack Web Development",
    skills: ["React", "Node.js", "MongoDB"],
    completed: "2021-06-15",
    created_at: "2023-01-01T00:00:00Z"
  },
]
export const achievements = [
  {
    id: "achievement-001",
    user_id: "user-7263",
    type: "achievement" as const,
    issuer: "Company Hackathon",
    name: "First Place Winner",
    skills: ["Innovation", "Programming"],
    created_at: "2023-01-01T00:00:00Z"
  }
];