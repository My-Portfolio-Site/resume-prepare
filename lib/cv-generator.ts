import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from "docx";
const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@docx.com";

interface Experience {
  company: { name: string };
  startDate: { month: number; year: number };
  endDate?: { month: number; year: number };
  isCurrent: boolean;
  title: string;
  summary: string;
}

interface Education {
  startDate: { year: number, month: number };
  endDate: { year: number, month: number };
  degree: string,
  fieldOfStudy: string,
  percentage: number,
  cgpa: number,
  schoolName: string,
  university: string,
  address: string,

}

interface Skill {
  name: string;
}

interface Course {
  name: string;
  issuer: string;
  completed: string;
}

interface Certification {
  name: string;
  issuer: string;
  completed: string;
  credentialId?: string;
}

export class DocumentCreator {
  public create([experiences, educations, skills, courses, certifications]: [Experience[], Education[], Skill[], Course[], Certification[]]): Document {
    const document = new Document({
      creator: "Keshab Manni",
      description: "My extremely interesting document",
      sections: [
        {
          children: [
            new Paragraph({
              text: "Dolan Miu",
              heading: HeadingLevel.HEADING_1
            }),
            this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            this.createHeading("Education"),
            ...educations
              .map(education => {
                const arr: Paragraph[] = [];
                arr.push(
                  this.createInstitutionHeader(
                    education.schoolName,
                    `${education.startDate.year} - ${education.endDate.year}`
                  )
                );
                arr.push(
                  this.createRoleText(
                    `${education.fieldOfStudy} - ${education.degree}`
                  )
                );

                const bulletPoints = this.splitParagraphIntoBullets(
                  education.address
                );
                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading("Experience"),
            ...experiences
              .map(position => {
                const arr: Paragraph[] = [];

                arr.push(
                  this.createInstitutionHeader(
                    position.company.name,
                    this.createPositionDateText(
                      position.startDate,
                      position.endDate,
                      position.isCurrent
                    )
                  )
                );
                arr.push(this.createRoleText(position.title));

                const bulletPoints = this.splitParagraphIntoBullets(
                  position.summary
                );

                bulletPoints.forEach(bulletPoint => {
                  arr.push(this.createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading("Skills, Achievements and Interests"),
            this.createSubHeading("Skills"),
            this.createSkillList(skills),
            this.createSubHeading("Certifications/Courses"),
            ...this.createCoursesList(courses),
            ...this.createCertificationsList(certifications),
            this.createSubHeading("Interests"),
            this.createInterests(
              "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."
            ),
            this.createHeading("References"),
            new Paragraph(
              "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
            ),
            new Paragraph("More references upon request"),
          ]
        }
      ]
    });

    return document;
  }

  public createContactInfo(
    phoneNumber: string,
    profileUrl: string,
    email: string
  ): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(
          `Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`
        ),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1
        })
      ]
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX
        }
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true
        })
      ]
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true
        })
      ]
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0
      }
    });
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map(skill => skill.name).join(", ") + ".")]
    });
  }

  // tslint:disable-next-line:no-any
  public createCoursesList(courses: any[]): Paragraph[] {
    return courses.map(
      course =>
        new Paragraph({
          text: course.name,
          bullet: {
            level: 0
          }
        })
    );
  }
  public createCertificationsList(Certifications: any[]): Paragraph[] {
    return Certifications.map(
      Certification =>
        new Paragraph({
          text: Certification.name,
          bullet: {
            level: 0
          }
        })
    );
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)]
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n");
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "N/A";
    }
  }
}
