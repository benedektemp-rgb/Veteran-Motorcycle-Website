import type { Locale } from "./locale";

export type Dictionary = {
  nav: {
    home: string;
    gallery: string;
    events: string;
    about: string;
    contact: string;
    toggleMenu: string;
  };
  footer: {
    visit: string;
    follow: string;
    rightsReserved: string;
    staffLogin: string;
  };
  home: {
    established: string;
    viewCollection: string;
    upcomingEvents: string;
    theCollection: string;
    heroSubheading: string;
    ourStory: string;
    restoredMotorcycles: string;
    featuredMachines: string;
    seeFullGallery: string;
    comingUp: string;
    nextEvent: string;
    allEvents: string;
  };
  gallery: {
    title: string;
    eyebrow: string;
    subtitle: string;
    allFilter: string;
    empty: string;
  };
  events: {
    title: string;
    eyebrow: string;
    subtitle: string;
    upcoming: string;
    noUpcoming: string;
    pastEvents: string;
  };
  about: {
    title: string;
    eyebrow: string;
    founded: string;
    onDisplay: string;
  };
  contact: {
    title: string;
    eyebrow: string;
    museumInfo: string;
    address: string;
    phone: string;
    email: string;
    emailUs: string;
    callUs: string;
    followAlong: string;
    mapTitle: string;
  };
};

const en: Dictionary = {
  nav: {
    home: "Home",
    gallery: "Gallery",
    events: "Events",
    about: "About",
    contact: "Contact",
    toggleMenu: "Toggle navigation menu",
  },
  footer: {
    visit: "Visit",
    follow: "Follow",
    rightsReserved: "All rights reserved.",
    staffLogin: "Staff Login",
  },
  home: {
    established: "EST. 1994",
    viewCollection: "View the Collection",
    upcomingEvents: "Upcoming Events",
    theCollection: "The Collection",
    heroSubheading: "Nine Decades of Iron, Fully Restored",
    ourStory: "Our Story",
    restoredMotorcycles: "Restored Motorcycles",
    featuredMachines: "Featured Machines",
    seeFullGallery: "See Full Gallery",
    comingUp: "Coming Up",
    nextEvent: "Next Event",
    allEvents: "All Events",
  },
  gallery: {
    title: "Gallery",
    eyebrow: "The Collection",
    subtitle:
      "Every motorcycle in our collection is fully restored and mechanically sound. Filter by era to explore.",
    allFilter: "All",
    empty: "No motorcycles in this era yet.",
  },
  events: {
    title: "Events",
    eyebrow: "What's On",
    subtitle:
      "Swap meets, night exhibitions, and hands-on workshops -- all held right on the museum floor.",
    upcoming: "Upcoming",
    noUpcoming: "No upcoming events scheduled right now -- check back soon.",
    pastEvents: "Past Events",
  },
  about: {
    title: "About the Museum",
    eyebrow: "Our Story",
    founded: "Founded",
    onDisplay: "On Display",
  },
  contact: {
    title: "Visit Us",
    eyebrow: "Get In Touch",
    museumInfo: "Museum Info",
    address: "Address",
    phone: "Phone",
    email: "Email",
    emailUs: "Email Us",
    callUs: "Call Us",
    followAlong: "Follow Along",
    mapTitle: "Museum location map",
  },
};

const hu: Dictionary = {
  nav: {
    home: "Főoldal",
    gallery: "Galéria",
    events: "Események",
    about: "Rólunk",
    contact: "Kapcsolat",
    toggleMenu: "Menü megnyitása",
  },
  footer: {
    visit: "Látogatás",
    follow: "Kövessen minket",
    rightsReserved: "Minden jog fenntartva.",
    staffLogin: "Munkatársi belépés",
  },
  home: {
    established: "ALAPÍTVA 1994",
    viewCollection: "Gyűjtemény megtekintése",
    upcomingEvents: "Közelgő események",
    theCollection: "A gyűjtemény",
    heroSubheading: "Kilenc évtizednyi vas, tökéletesen felújítva",
    ourStory: "Történetünk",
    restoredMotorcycles: "Felújított motorkerékpár",
    featuredMachines: "Kiemelt gépek",
    seeFullGallery: "Teljes galéria megtekintése",
    comingUp: "Hamarosan",
    nextEvent: "Következő esemény",
    allEvents: "Összes esemény",
  },
  gallery: {
    title: "Galéria",
    eyebrow: "A gyűjtemény",
    subtitle:
      "Gyűjteményünk minden motorkerékpárja teljesen felújított és műszakilag kifogástalan. Böngésszen korszak szerint szűrve.",
    allFilter: "Összes",
    empty: "Ebből a korszakból még nincs motorkerékpár.",
  },
  events: {
    title: "Események",
    eyebrow: "Programjaink",
    subtitle:
      "Cserebörzék, esti kiállítások és gyakorlati workshopok -- mindez a múzeum falai között.",
    upcoming: "Közelgő",
    noUpcoming: "Jelenleg nincs tervezett esemény -- nézzen vissza hamarosan.",
    pastEvents: "Korábbi események",
  },
  about: {
    title: "A múzeumról",
    eyebrow: "Történetünk",
    founded: "Alapítva",
    onDisplay: "Kiállítva",
  },
  contact: {
    title: "Látogasson el",
    eyebrow: "Lépjen kapcsolatba",
    museumInfo: "Múzeum adatai",
    address: "Cím",
    phone: "Telefon",
    email: "E-mail",
    emailUs: "Írjon nekünk",
    callUs: "Hívjon minket",
    followAlong: "Kövessen minket",
    mapTitle: "Múzeum térkép",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, hu };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
