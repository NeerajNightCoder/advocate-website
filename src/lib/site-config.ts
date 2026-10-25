/**
 * Illustrative demo content for layout and contact fields.
 * Replace with verified professional information before launch.
 * Review all fields against applicable Bar Council of India rules.
 */
export const siteConfig = {
  advocateName: "Ananya Verma",
  advocateNameHi: "अनन्या वर्मा",
  barCouncil: "Bar Council of Bihar",
  enrolmentNumber: "BH/2847/2018",
  enrolmentYear: "2018",
  email: "chamber.ananya.verma@gmail.com",
  phone: "+91 94310 24567",
  chamberAddress: {
    line1: "Chamber No. 118, Advocates' Chambers",
    line2: "Buddha Marg, Near Patna High Court, Patna, Bihar 800001",
  },
  courtName: "Patna High Court",
  location: "Patna, Bihar",
  officeHours: "Monday–Friday, 10:00–17:00 (consultations by prior appointment)",
  mapsQuery: "Advocates Chambers Buddha Marg Patna High Court",
} as const;

export function getAdvocateDisplayName(locale: string): string {
  return locale === "hi" ? siteConfig.advocateNameHi : siteConfig.advocateName;
}
