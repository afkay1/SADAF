export const BRAND = {
  name: "SADAF",
  full: "SADAF Residences",
  tagline: "Beachfront living on the Red Sea",
  phone: "+966 12 555 0148",
  phoneHref: "tel:+966125550148",
  email: "residences@sadaf.example",
  address: "Al Shuaibah Coast, Red Sea, Saudi Arabia",
};

export type AptType = "Garden" | "Courtyard" | "Terrace" | "Penthouse";

export interface Apartment {
  slug: string;
  name: string;
  type: AptType;
  beds: number;
  baths: number;
  size: number; // m2
  terrace: number; // m2
  floor: string;
  price: number; // SAR
  image: string;
  gallery: string[];
  blurb: string;
  details: string[];
}

export const APARTMENTS: Apartment[] = [
  {
    slug: "marjan-garden",
    name: "Marjan Garden Residence",
    type: "Garden",
    beds: 2,
    baths: 2,
    size: 128,
    terrace: 46,
    floor: "Ground",
    price: 1850000,
    image: "/images/apartment-ground.jpg",
    gallery: ["/images/interior-kitchen.jpg", "/images/interior-bedroom.jpg", "/images/amenity-landscape.jpg"],
    blurb:
      "Step from your living room onto a private garden terrace that opens toward the lagoon. Cool limestone floors, deep shaded loggias and a kitchen made for long dinners.",
    details: ["Private garden terrace", "Direct lagoon path", "Open-plan kitchen", "Outdoor shower", "Two parking bays"],
  },
  {
    slug: "lulu-courtyard",
    name: "Lulu Courtyard Residence",
    type: "Courtyard",
    beds: 3,
    baths: 3,
    size: 186,
    terrace: 38,
    floor: "First",
    price: 2760000,
    image: "/images/apartment-courtyard.jpg",
    gallery: ["/images/interior-dining.jpg", "/images/majlis-corner.jpg", "/images/interior-bedroom.jpg"],
    blurb:
      "Built around a quiet inner courtyard, with a majlis, three en-suite bedrooms and carved screens that filter the afternoon light into soft patterns.",
    details: ["Inner courtyard", "Traditional majlis", "Three en-suite bedrooms", "Maid's room", "Two parking bays"],
  },
  {
    slug: "shams-terrace",
    name: "Shams Terrace Residence",
    type: "Terrace",
    beds: 3,
    baths: 3,
    size: 214,
    terrace: 92,
    floor: "Second",
    price: 3480000,
    image: "/images/terrace-tall.jpg",
    gallery: ["/images/closing-terrace.jpg", "/images/interior-dining-alt.jpg", "/images/amenity-pool.jpg"],
    blurb:
      "A wide sea-facing terrace sets the rhythm of this home: breakfast in the shade, sunset on the daybed, and a plunge pool within reach of the master suite.",
    details: ["92 m² sea terrace", "Private plunge pool", "Master suite with dressing room", "Sea views", "Three parking bays"],
  },
  {
    slug: "durrat-penthouse",
    name: "Durrat Penthouse",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    size: 332,
    terrace: 160,
    floor: "Third",
    price: 6900000,
    image: "/images/apartment-penthouse.jpg",
    gallery: ["/images/hero-night.jpg", "/images/interior-dining.jpg", "/images/amenity-spa.jpg"],
    blurb:
      "The crown of SADAF. Four bedrooms, a rooftop terrace with its own pool and a panoramic view of the Red Sea from sunrise to the last light.",
    details: ["Rooftop terrace and pool", "Four en-suite bedrooms", "Private lift lobby", "Panoramic sea views", "Four parking bays"],
  },
  {
    slug: "yasmin-garden",
    name: "Yasmin Garden Residence",
    type: "Garden",
    beds: 1,
    baths: 1,
    size: 84,
    terrace: 28,
    floor: "Ground",
    price: 1190000,
    image: "/images/majlis-corner.jpg",
    gallery: ["/images/interior-kitchen.jpg", "/images/interior-bedroom.jpg", "/images/amenity-landscape.jpg"],
    blurb:
      "A calm one-bedroom retreat with a walled garden. Ideal as a holiday home that looks after itself when you are away.",
    details: ["Walled garden", "Fully fitted kitchen", "Resort management available", "One parking bay"],
  },
  {
    slug: "nakhil-terrace",
    name: "Nakhil Terrace Residence",
    type: "Terrace",
    beds: 2,
    baths: 2,
    size: 142,
    terrace: 58,
    floor: "Second",
    price: 2390000,
    image: "/images/facade-low-angle.jpg",
    gallery: ["/images/interior-dining-alt.jpg", "/images/closing-terrace.jpg", "/images/interior-bedroom.jpg"],
    blurb:
      "Palm-framed views and a generous terrace make this two-bedroom the most social home in the community.",
    details: ["Palm-framed terrace", "Two en-suite bedrooms", "Outdoor kitchen", "Two parking bays"],
  },
];

export const TYPES: ("All" | AptType)[] = ["All", "Garden", "Courtyard", "Terrace", "Penthouse"];

export const formatSAR = (n: number) => "SAR " + n.toLocaleString("en-US");

export const AMENITIES = [
  { name: "Lagoon pool", text: "A 60-metre saltwater lagoon, shaded by palms and open from dawn to midnight.", image: "/images/amenity-pool.jpg" },
  { name: "The Spa House", text: "Hammam, cold plunge and treatment rooms in a quiet courtyard of stone and water.", image: "/images/amenity-spa.jpg" },
  { name: "Community majlis", text: "A shared hall for gatherings, with a kitchen, a library and a terrace facing the sea.", image: "/images/amenity-community.jpg" },
  { name: "Gardens & paths", text: "Native planting and shaded walks that connect every home to the beach in under four minutes.", image: "/images/amenity-landscape.jpg" },
  { name: "Covered parking", text: "Shaded, covered parking with electric vehicle charging at every bay.", image: "/images/amenity-parking.jpg" },
];

export const REASONS = [
  {
    title: "The sea, at your doorstep",
    text: "Every residence sits within a four-minute walk of a private stretch of Red Sea beach, with water that stays calm and clear nearly all year.",
    image: "/images/aerial-coast.jpg",
  },
  {
    title: "Architecture that breathes",
    text: "Deep loggias, carved screens and courtyards keep homes naturally cool, drawing on the coastal building traditions of the Hejaz.",
    image: "/images/facade-low-angle.jpg",
  },
  {
    title: "A community, not a compound",
    text: "Just 96 homes share the lagoon, the spa house and the majlis, so neighbours know each other and nothing ever feels crowded.",
    image: "/images/amenity-community.jpg",
  },
];

export const ROUTE_POINTS = [
  { label: "Jeddah", time: "55 min", note: "King Abdulaziz Airport" },
  { label: "King Abdullah Economic City", time: "30 min", note: "Business and marina" },
  { label: "Red Sea Marina", time: "12 min", note: "Yachting and diving" },
  { label: "SADAF", time: "You are here", note: "Al Shuaibah Coast" },
];

export const CREDITS = [
  { role: "Master planning", name: "Atelier Hijaz", text: "Coastal planners who shaped the 96-home layout around prevailing sea breezes and shared walking routes." },
  { role: "Architecture", name: "Studio Salma Al-Qahtani", text: "Contemporary homes drawing on Hejazi courtyards, mashrabiya screens and limestone craftsmanship." },
  { role: "Landscape", name: "Wadi & Sand", text: "Native, low-water planting that keeps gardens green with minimal irrigation." },
  { role: "Interiors", name: "Maison Rawan", text: "Warm, tactile interiors in oak, travertine and linen, delivered fully furnished on request." },
  { role: "Development", name: "SADAF Development Co.", text: "A Saudi developer focused on small, well-made coastal communities." },
];

export const STATS = [
  { value: "96", label: "Private residences" },
  { value: "4", label: "Minutes to the beach" },
  { value: "60 m", label: "Lagoon pool" },
  { value: "2028", label: "Handover" },
];
