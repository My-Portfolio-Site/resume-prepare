export interface DateInfo {
  month: number;
  year: number;
}

export interface Company {
  name: string;
  location: string;
  industry: string;
}

export interface Experience {
  isCurrent: boolean;
  summary: string;
  title: string;
  startDate: DateInfo;
  endDate: DateInfo;
  company: Company;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  percentage: number;
  cgpa: number;
  schoolName: string;
  university: string;
  address: string;
  startDate: {
    year: number;
    month: number;
  };
  endDate: {
    year: number;
    month: number;
  };
  achievements?: string[];
  courses?: string[];
  activities?: string[];
}
