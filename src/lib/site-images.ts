export type SiteImageKey =
  | "hero"
  | "profilePortrait"
  | "location"
  | "practiceLibrary"
  | "practiceConstitutional"
  | "practiceCivil"
  | "practiceCriminal"
  | "contactOffice";

export const siteImages: Record<
  SiteImageKey,
  { src: string; width: number; height: number }
> = {
  hero: {
    src: "/images/hero-patna-high-court.jpg",
    width: 1920,
    height: 1080,
  },
  profilePortrait: {
    src: "/images/profile-portrait.jpg",
    width: 900,
    height: 1200,
  },
  location: {
    src: "/images/location-patna-high-court.jpg",
    width: 1280,
    height: 717,
  },
  practiceLibrary: {
    src: "/images/practice-library.jpg",
    width: 1200,
    height: 900,
  },
  practiceConstitutional: {
    src: "/images/practice-constitutional.jpg",
    width: 1200,
    height: 900,
  },
  practiceCivil: {
    src: "/images/practice-civil.jpg",
    width: 1200,
    height: 900,
  },
  practiceCriminal: {
    src: "/images/practice-criminal.jpg",
    width: 1200,
    height: 900,
  },
  contactOffice: {
    src: "/images/contact-office.jpg",
    width: 1920,
    height: 1080,
  },
};

export const practiceCardImageKeys: Record<
  "constitutional" | "civil" | "criminal",
  SiteImageKey
> = {
  constitutional: "practiceConstitutional",
  civil: "practiceCivil",
  criminal: "practiceCriminal",
};

export const practiceAreaImageKeys: Record<
  "constitutional" | "civil" | "criminal" | "service" | "commercial",
  SiteImageKey
> = {
  constitutional: "practiceConstitutional",
  civil: "practiceCivil",
  criminal: "practiceCriminal",
  service: "practiceLibrary",
  commercial: "practiceCivil",
};
