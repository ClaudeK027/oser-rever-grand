/**
 * ═══════════════════════════════════════════════════
 * MOCK DATA — "Oser Rêver Grand" Conference 2026
 * ═══════════════════════════════════════════════════
 *
 * Données simulées basées sur le PDF officiel.
 * Structurées avec des types stricts pour faciliter
 * la future migration vers Supabase.
 *
 * Chaque entité possède un `id` unique (UUID-ready)
 * et un champ `image` optionnel pour le fallback.
 */

// ─── Types ───

export interface Intervenant {
  id: string;
  nom: string;
  prenom: string;
  role: string;
  description: string;
  image?: string; // URL optionnelle — fallback si absent
  socials?: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

export interface MembreEquipe {
  id: string;
  nom: string;
  prenom: string;
  titre: string;
  image?: string;
  socials?: {
    linkedin?: string;
  };
}

export interface Statistique {
  id: string;
  valeur: string;
  label: string;
  description: string;
}

export interface VisionItem {
  id: string;
  titre: string;
  points: string[];
  accentColor: "gold" | "blue" | "green";
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// ─── Navigation ───

export const navigation: NavigationItem[] = [
  { label: "Accueil", href: "#accueil" },
  {
    label: 'Pourquoi "Oser Rêver Grand" ?',
    href: "#pourquoi",
    children: [
      { label: "Présentation", href: "#presentation" },
      { label: "Vision & Mission", href: "#vision" },
      { label: "Histoire", href: "#histoire" },
    ],
  },
  { label: "Intervenants", href: "#intervenants" },
  { label: "Programme", href: "#programme" },
  { label: "Moments Forts", href: "#moments-forts" },
  { label: "Notre Équipe", href: "#equipe" },
  { label: "Inscription", href: "#inscription" },
];

// ─── Statistiques ───

export const statistiques: Statistique[] = [
  {
    id: "stat-1",
    valeur: "21",
    label: "ans",
    description:
      "Avec une population dont l'âge médian est de 21 ans seulement, le Gabon est un pays qui bénéficie d'un potentiel énorme, et d'une jeunesse capable de fortement contribuer au développement du pays.",
  },
  {
    id: "stat-2",
    valeur: "70",
    label: "%",
    description:
      "Au Gabon, près de 70 % de la population a moins de 35 ans, ce qui témoigne du rôle central que joue la jeunesse dans le développement économique, social et culturel du pays.",
  },
];

// ─── Intervenants ───

export const intervenants: Intervenant[] = [
  {
    id: "int-1",
    nom: "ALLOGO",
    prenom: "Jessica",
    role: "Ancienne Ingénieure Pétrolière & Fondatrice",
    description:
      "Ancienne ingénieure pétrolière, fondatrice de la marque \"Les Petits Pots de l’OGOOUÉ\".",
    image: "/infos%20site%20internet/speaker-1.avif",
    socials: {
      linkedin: "https://www.linkedin.com/posts/jessica-allogo-615a7356_lespetitspotsdelogoouaez-canalplusafrique-ugcPost-6541427805278740480-XM4q/"
    }
  },
  {
    id: "int-2",
    nom: "Jordan",
    prenom: "Braddy",
    role: "Entrepreneur & Réalisateur",
    description: "Entrepreneur et réalisateur passionné par l'image et l'innovation.",
    image: "/infos%20site%20internet/speaker-2.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/braddy-jordan-463a31214/"
    }
  },
  {
    id: "int-3",
    nom: "EVOUNA",
    prenom: "Franck Anthony",
    role: "Entrepreneur & DGA des Éditions NTSAME",
    description:
      "Entrepreneur et Directeur général adjoint des Éditions NTSAME, figure de proue de la culture.",
    image: "/infos%20site%20internet/speaker-3.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/franck-anthony-evouna-20423a149/"
    }
  },
  {
    id: "int-4",
    nom: "MVE ASSEKO",
    prenom: "Simplice",
    role: "Coach, Entrepreneur & Fondateur",
    description:
      "Coach, entrepreneur, et fondateur de la CYBER SCHOOL, expert en transformation numérique.",
    image: "/infos%20site%20internet/speaker-4.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/simplice-mve-asseko-5483491a9/"
    }
  },
  {
    id: "int-5",
    nom: "MIGUIAMA BAMBA",
    prenom: "Georf",
    role: "Ingénieur en IA",
    description: "Expert en Intelligence Artificielle, accompagnant la jeunesse vers les technologies de demain.",
    image: "/infos%20site%20internet/speaker-5.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/georfmiguiamabamba/"
    }
  },
];

// ─── Vision ───

export const visionItems: VisionItem[] = [
  {
    id: "vision-1",
    titre: "Inspiration et Motivation",
    points: [
      "Partager des histoires de réussite pour montrer que tout est possible avec audace et détermination.",
      "Encourager chaque jeune à dépasser ses limites et oser rêver grand.",
    ],
    accentColor: "gold",
  },
  {
    id: "vision-2",
    titre: "Engagement et Impact sur le Gabon",
    points: [
      "Encourager la jeunesse à contribuer au développement économique, social et culturel du pays.",
      "Valoriser le rôle des jeunes comme acteurs de changement et futurs leaders du Gabon.",
      "Favoriser un réseau de jeunes motivés et connectés qui pourra porter des initiatives porteuses pour le pays.",
    ],
    accentColor: "blue",
  },
  {
    id: "vision-3",
    titre: "Innovation et Entrepreneuriat",
    points: [
      "Encourager les jeunes à proposer des idées nouvelles et audacieuses pour résoudre les problèmes locaux et nationaux.",
      "Valoriser l'entrepreneuriat comme levier de transformation économique au Gabon.",
    ],
    accentColor: "green",
  },
];

// ─── Contenu texte ───

export const contenu = {
  presentation: {
    titre: "C'est quoi \"Oser Rêver Grand\" ?",
    texte:
      "La conférence \"OSER RÊVER GRAND\" vise à inspirer les jeunes gabonais à croire en leur potentiel, adopter une vision ambitieuse et transformer leurs rêves en actions concrètes, afin de contribuer activement au développement du pays malgré les défis du monde actuel.",
  },
  mission: {
    titre: "Notre Mission",
    texte1:
      "Notre mission est d'inspirer et d'accompagner la jeunesse gabonaise à travers des conférences, des témoignages et des échanges, afin de les aider à développer une vision ambitieuse et à passer à l'action.",
    texte2:
      "Au-delà des conférences, \"OSER RÊVER GRAND\" ambitionne de devenir un acteur répondant aux besoins de nombreux jeunes gabonais, à travers la mise en place de dispositifs de financement et d'accompagnement, tout en leur permettant de bénéficier de l'expertise de professionnels pour le développement de leurs projets.",
  },
  histoire: {
    titre: "Notre Histoire",
    texte1:
      "\"OSER RÊVER GRAND\" est né d'un triste constat. Le constat selon lequel, la jeunesse gabonaise a du mal à trouver sa place sur le continent africain, et n'arrive pas à véritablement impacter le continent.",
    texte2:
      "Ce constat est d'autant plus alarmant que le pays regorge de jeunes aux grandes capacités et porteurs d'idées formidables. Pourtant, malgré ce potentiel, le plus difficile reste souvent de se lancer et, surtout, de croire en soi. Il était donc essentiel de permettre à cette jeunesse d'écouter des personnalités inspirantes, afin de l'encourager et de la motiver à envisager un avenir ambitieux.",
  },
};

// ─── Équipe ───

export interface MembreEquipeFull extends MembreEquipe {
  bio?: string;
}

export const equipe: MembreEquipeFull[] = [
  {
    id: "eq-1",
    nom: "MOUTOUBOU-LEBAMA",
    prenom: "Terance",
    titre: "Étudiant en Master Finance d'Entreprise",
    image: "/infos%20site%20internet/membre-1.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/moutouboulebamaterance/" }
  },
  {
    id: "eq-2",
    nom: "ZANG",
    prenom: "Prescillia",
    titre: "Titulaire d'un Master en Comptabilité",
    image: "/infos%20site%20internet/membre-2.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/priscillia1/" }
  },
  {
    id: "eq-3",
    nom: "NYNGONE",
    prenom: "Auriane",
    titre: "Étudiante en Marketing et Communication",
    image: "/infos%20site%20internet/membre-3.jpeg",
    bio: "Aurianne d’ana est une jeune femme de 23 ans, actuellement en études dans le cadre d’un double diplôme en conseil en image, chef de projet événementiel, ainsi qu’en marketing et communication. En parallèle, elle exerce en tant que conseillère en image. Elle est la fondatrice et conseillère en image du programme Transformation, ainsi que la créatrice et fondatrice de la marque Holy Fashion. Elle est également à l'origine de « Journal intime d'une femme » (JIDF), une émission diffusée sur Canal Plus International et sur YouTube via la chaîne Evangel TV (EVTV), dont elle est la coordonnatrice et l'animatrice principale.",
    socials: { linkedin: "https://www.linkedin.com/in/aurianne-d’ana-nyngone-zue-b032ba225/" }
  },
  {
    id: "eq-4",
    nom: "ABAGHE EYA",
    prenom: "Dorline",
    titre: "Étudiante en Master Finance d'Entreprise",
    image: "/infos%20site%20internet/membre-4.jpeg",
    bio: "Étudiante gabonaise en master 2 Ingénierie Financière à Paris, je conjugue la rigueur des chiffres avec ma passion pour l'écriture. Auteure de plusieurs ouvrages, dont Femme Royale, ma mission est d’inspirer chacun à explorer son plein potentiel et à voir des vies se transformer. Devise : « Portée par la miséricorde de Dieu et dépendante de sa grâce. »",
    socials: { linkedin: "https://www.linkedin.com/in/dorline-abaghe-eya-205308223/" }
  },
  {
    id: "eq-5",
    nom: "OBIANG MVE",
    prenom: "Levy",
    titre: "Étudiant en Master Finance d'Entreprise",
    image: "/infos%20site%20internet/membre-5.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/lévy-junior-obiang-mve-108660225/" }
  },
  {
    id: "eq-6",
    nom: "MOUDZIEGOU",
    prenom: "Loric",
    titre: "Étudiant en Master Finance de Marché",
    image: "/infos%20site%20internet/membre-6.jpeg",
    socials: { linkedin: "https://www.linkedin.com/in/edy-loudi-b143471bb/" }
  },
  {
    id: "eq-7",
    nom: "ESSONO ELLA",
    prenom: "Jeremy",
    titre: "Étudiant en Licence Psychologie",
    image: "/infos%20site%20internet/membre-7.jpeg",
  },
  {
    id: "eq-8",
    nom: "MAYOMBO",
    prenom: "Gomez",
    titre: "Étudiant en Master Finance de Marché",
    image: "/infos%20site%20internet/membre-8.jpeg",
  },
];

// ─── Réseaux sociaux ───

export const socials = {
  facebook: "https://www.facebook.com/share/1GWNqrsceX/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@oser.rver.grand.c?_r=1&_t=ZN-95gC6RFtorW",
  instagram: "https://www.instagram.com/conforg.2026?igsh=bGNlNzV0dnZsYWUw&utm_source=qr",
  email: "mailto:conference.oserrevergrand@gmail.com",
  linkedin: "https://www.linkedin.com/company/112617864/",
  phone: "+24162707988",
};
