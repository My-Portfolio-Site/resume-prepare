const userDetails = {
  id: 124223,
  user_id: 89899,
  experiences: [
    {
      user_id: 7263,
      isCurrent: true,
      summary: "Full-stack developer working with Angular and Java. Working for the iShares platform",
      title: "Associate Software Developer",
      startDate: {
        month: 11,
        year: 2017,
      },
      endDate: {
        month: 11,
        year: 2025,
      },
      company: {
        name: "BlackRock",
        location: "London, UK",  // Add location
        industry: "Financial Services"  // Add industry
      },
      achievements: [  // Add key achievements
        "Improved application performance by 40% through optimization",
        "Led team of 3 developers in new feature development",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ],
      technologies: [  // Add specific technologies
        "Angular 12",
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "AWS"
      ]
    },
    {
      user_id: 7263,
      isCurrent: false,
      summary: "Full-stack developer working with Angular and Java. Working for the iShares platform",
      title: "Associate Software Developer",
      startDate: {
        month: 11,
        year: 2017,
      },
      endDate: {
        month: 11,
        year: 2019,
      },
      company: {
        name: "BlackRock",
        location: "London, UK",  // Add location
        industry: "Financial Services"  // Add industry
      },
      achievements: [  // Add key achievements
        "Improved application performance by 40% through optimization",
        "Led team of 3 developers in new feature development",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ],
      technologies: [  // Add specific technologies
        "Angular 12",
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "AWS"
      ]
    },
  ],
  education: [
    {
      degree: "BTech",
      fieldOfStudy: "Computer Science",
      percentage: 62,
      cgpa: 2.3,
      schoolName: "Aditya Engineering College",
      university: "JNTUK",
      address: "Surampalem, Andhra Pradesh, India",
      startDate: {
        year: 2012,
        month: 8
      },
      endDate: {
        year: 2013,
        month: 8
      },
    }
  ],
  skills: ["Angular", "TypeScript", "JavaScript", "NodeJS"],
  achievements: [
    {
      issuer: "Oracle",
      name: "Oracle Certified Expert",
    },
  ],

  certifications: [
    {
      issuer: "Coursera",
      name: "Full Stack Web Development Cert",
      completed: "2021",
      credentialId: ""
    },
    {
      issuer: "Udemy",
      name: "React - The Complete Guide Cert",
      completed: "2020",
      credentialId: ""
    }
  ],

  courses: [
    {
      issuer: "Coursera",
      name: "Full Stack Web Development",
      completed: "2021",
    },
    {
      issuer: "Udemy",
      name: "React - The Complete Guide",
      completed: "2020",
    }
  ]
}