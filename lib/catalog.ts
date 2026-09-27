// Bundled catalog. Used as-is when Supabase is not configured, and as the
// source for supabase/seed.sql (npm run seed:generate). All prices are sample
// starting values: tune them in Supabase (or here) before going live.
import type { Brand, ConditionQuestion, PhoneModel, Product, RepairService, Tier, Variant } from "./types";

export const BRANDS: Brand[] = [
  { slug: "apple", name: "Apple", sort: 1 },
  { slug: "samsung", name: "Samsung", sort: 2 },
  { slug: "oneplus", name: "OnePlus", sort: 3 },
  { slug: "vivo", name: "Vivo", sort: 4 },
  { slug: "oppo", name: "Oppo", sort: 5 },
  { slug: "xiaomi", name: "Xiaomi / Redmi", sort: 6 },
  { slug: "realme", name: "Realme", sort: 7 },
  { slug: "motorola", name: "Motorola", sort: 8 },
  { slug: "iqoo", name: "iQOO", sort: 9 },
  { slug: "poco", name: "Poco", sort: 10 },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function m(brandSlug: string, name: string, year: number, tier: Tier, variants: [string, number][]): PhoneModel {
  return {
    slug: slugify(name),
    brandSlug,
    name,
    year,
    tier,
    variants: variants.map(([label, basePrice]): Variant => ({ label, basePrice })),
  };
}

export const MODELS: PhoneModel[] = [
  // Apple
  m("apple", "iPhone 17 Pro Max", 2025, "premium", [["256 GB", 118000], ["512 GB", 132000], ["1 TB", 146000]]),
  m("apple", "iPhone 17", 2025, "premium", [["256 GB", 66000], ["512 GB", 76000]]),
  m("apple", "iPhone 16 Pro", 2024, "premium", [["128 GB", 72000], ["256 GB", 79000], ["512 GB", 88000]]),
  m("apple", "iPhone 16", 2024, "premium", [["128 GB", 50000], ["256 GB", 56000]]),
  m("apple", "iPhone 15", 2023, "premium", [["128 GB", 40000], ["256 GB", 45000]]),
  m("apple", "iPhone 14", 2022, "flagship", [["128 GB", 30000], ["256 GB", 34000]]),
  m("apple", "iPhone 13", 2021, "flagship", [["128 GB", 25500], ["256 GB", 28500]]),
  m("apple", "iPhone 12", 2020, "flagship", [["64 GB", 17000], ["128 GB", 19500]]),
  m("apple", "iPhone 11", 2019, "flagship", [["64 GB", 12500], ["128 GB", 14500]]),
  // Samsung
  m("samsung", "Galaxy S25 Ultra", 2025, "premium", [["12 GB / 256 GB", 82000], ["12 GB / 512 GB", 92000]]),
  m("samsung", "Galaxy S24", 2024, "flagship", [["8 GB / 128 GB", 36000], ["8 GB / 256 GB", 40000]]),
  m("samsung", "Galaxy S23 FE", 2023, "flagship", [["8 GB / 128 GB", 20000], ["8 GB / 256 GB", 23000]]),
  m("samsung", "Galaxy A55 5G", 2024, "mid", [["8 GB / 128 GB", 16500], ["8 GB / 256 GB", 18500]]),
  m("samsung", "Galaxy A35 5G", 2024, "mid", [["8 GB / 128 GB", 13500], ["8 GB / 256 GB", 15000]]),
  m("samsung", "Galaxy M35 5G", 2024, "budget", [["6 GB / 128 GB", 8500], ["8 GB / 128 GB", 9500]]),
  m("samsung", "Galaxy F15 5G", 2024, "budget", [["4 GB / 128 GB", 5500], ["6 GB / 128 GB", 6500]]),
  // OnePlus
  m("oneplus", "OnePlus 13", 2025, "flagship", [["12 GB / 256 GB", 46000], ["16 GB / 512 GB", 52000]]),
  m("oneplus", "OnePlus 12", 2024, "flagship", [["12 GB / 256 GB", 34000], ["16 GB / 512 GB", 38500]]),
  m("oneplus", "OnePlus 12R", 2024, "mid", [["8 GB / 128 GB", 22000], ["16 GB / 256 GB", 25500]]),
  m("oneplus", "OnePlus Nord 4", 2024, "mid", [["8 GB / 128 GB", 16000], ["12 GB / 256 GB", 18500]]),
  m("oneplus", "OnePlus Nord CE 4", 2024, "mid", [["8 GB / 128 GB", 12500], ["8 GB / 256 GB", 14000]]),
  m("oneplus", "OnePlus Nord CE 3 Lite", 2023, "budget", [["8 GB / 128 GB", 8000], ["8 GB / 256 GB", 9000]]),
  // Vivo
  m("vivo", "Vivo X200", 2024, "flagship", [["12 GB / 256 GB", 42000], ["16 GB / 512 GB", 48000]]),
  m("vivo", "Vivo V40", 2024, "mid", [["8 GB / 128 GB", 20000], ["12 GB / 256 GB", 23500]]),
  m("vivo", "Vivo V29", 2023, "mid", [["8 GB / 128 GB", 13500], ["12 GB / 256 GB", 16000]]),
  m("vivo", "Vivo T3 5G", 2024, "mid", [["8 GB / 128 GB", 10500], ["8 GB / 256 GB", 12000]]),
  m("vivo", "Vivo Y28s 5G", 2024, "budget", [["4 GB / 128 GB", 5500], ["6 GB / 128 GB", 6500]]),
  // Oppo
  m("oppo", "Oppo Find X8", 2024, "flagship", [["12 GB / 256 GB", 40000], ["16 GB / 512 GB", 46000]]),
  m("oppo", "Oppo Reno 12 Pro", 2024, "mid", [["12 GB / 256 GB", 20000], ["12 GB / 512 GB", 23000]]),
  m("oppo", "Oppo F27 Pro+", 2024, "mid", [["8 GB / 128 GB", 13000], ["8 GB / 256 GB", 14500]]),
  m("oppo", "Oppo A79 5G", 2023, "budget", [["8 GB / 128 GB", 7000]]),
  // Xiaomi / Redmi
  m("xiaomi", "Xiaomi 14", 2024, "flagship", [["12 GB / 512 GB", 34000]]),
  m("xiaomi", "Redmi Note 14 Pro+", 2025, "mid", [["8 GB / 256 GB", 18500], ["12 GB / 512 GB", 21500]]),
  m("xiaomi", "Redmi Note 13 Pro", 2024, "mid", [["8 GB / 128 GB", 12500], ["8 GB / 256 GB", 14000]]),
  m("xiaomi", "Redmi Note 12 Pro", 2023, "mid", [["6 GB / 128 GB", 8500], ["8 GB / 256 GB", 10000]]),
  m("xiaomi", "Redmi 13 5G", 2024, "budget", [["6 GB / 128 GB", 6000], ["8 GB / 128 GB", 7000]]),
  // Realme
  m("realme", "Realme GT 7 Pro", 2024, "flagship", [["12 GB / 256 GB", 34000], ["16 GB / 512 GB", 39000]]),
  m("realme", "Realme 13 Pro+", 2024, "mid", [["8 GB / 256 GB", 17000], ["12 GB / 512 GB", 20000]]),
  m("realme", "Realme 11 Pro", 2023, "mid", [["8 GB / 128 GB", 10000], ["8 GB / 256 GB", 11500]]),
  m("realme", "Realme Narzo 70 Pro", 2024, "budget", [["8 GB / 128 GB", 8500], ["8 GB / 256 GB", 9500]]),
  // Motorola
  m("motorola", "Motorola Edge 50 Pro", 2024, "mid", [["8 GB / 256 GB", 16000], ["12 GB / 256 GB", 18000]]),
  m("motorola", "Moto G85 5G", 2024, "budget", [["8 GB / 128 GB", 8500], ["12 GB / 256 GB", 10000]]),
  m("motorola", "Moto G64 5G", 2024, "budget", [["8 GB / 128 GB", 7000], ["12 GB / 256 GB", 8000]]),
  // iQOO
  m("iqoo", "iQOO 13", 2024, "flagship", [["12 GB / 256 GB", 38000], ["16 GB / 512 GB", 43000]]),
  m("iqoo", "iQOO Neo 9 Pro", 2024, "mid", [["8 GB / 256 GB", 19000], ["12 GB / 256 GB", 21000]]),
  m("iqoo", "iQOO Z9 5G", 2024, "budget", [["8 GB / 128 GB", 9000], ["8 GB / 256 GB", 10000]]),
  // Poco
  m("poco", "Poco F6", 2024, "mid", [["8 GB / 256 GB", 17500], ["12 GB / 512 GB", 20500]]),
  m("poco", "Poco X6 Pro", 2024, "mid", [["8 GB / 256 GB", 13500], ["12 GB / 512 GB", 15500]]),
  m("poco", "Poco M6 Pro 5G", 2023, "budget", [["6 GB / 128 GB", 5500], ["8 GB / 256 GB", 6500]]),
];

/** Cashify-style condition quiz. Rupee impacts are shown to the customer as pct × base price. */
export const CONDITION_QUESTIONS: ConditionQuestion[] = [
  {
    key: "power",
    title: "Does the device turn on and make outgoing calls?",
    subtitle: "The phone must boot into the OS and detect a SIM / network.",
    badge: "Mandatory check",
    kind: "single",
    options: [
      { key: "working", label: "Yes, fully working", hint: "Powers on, touchscreen works, calls connect", icon: "power" },
      { key: "dead", label: "No, dead / boot loop", hint: "Doesn't turn on or restarts repeatedly", icon: "power_off", multiplier: 0.4 },
    ],
  },
  {
    key: "screen",
    title: "Screen & display condition",
    subtitle: "Check the screen at full brightness for yellow tint, lines or touch issues.",
    badge: "Display integrity",
    kind: "single",
    options: [
      { key: "flawless", label: "Flawless display", hint: "No scratches, original display", icon: "smartphone" },
      { key: "scratches", label: "Minor scratches", hint: "1–2 light scratches visible only under light", icon: "texture", pct: -0.03 },
      { key: "dead_pixels", label: "Dead pixels / lines", hint: "Spots, green/white lines or black patches", icon: "blur_linear", pct: -0.1 },
      { key: "cracked", label: "Cracked glass", hint: "Cracks or broken touch", icon: "broken_image", pct: -0.16 },
    ],
  },
  {
    key: "body",
    title: "Body & back panel",
    subtitle: "Frame, back glass and buttons.",
    badge: "Cosmetics",
    kind: "single",
    options: [
      { key: "like_new", label: "Like new", hint: "No dents, no discolouration", icon: "verified" },
      { key: "normal", label: "Normal wear", hint: "Tiny scuffs, light edge wear", icon: "fingerprint", pct: -0.02 },
      { key: "dented", label: "Heavy dents / cracked back", hint: "Bent frame or broken back glass", icon: "warning", pct: -0.06 },
    ],
  },
  {
    key: "faults",
    title: "Functional faults",
    subtitle: "Select everything that is NOT working. Leave empty if all is fine.",
    badge: "Select all that apply",
    kind: "multi",
    options: [
      { key: "camera", label: "Front / rear camera", icon: "photo_camera", pct: -0.04 },
      { key: "battery", label: "Battery health below 80%", icon: "battery_alert", pct: -0.03 },
      { key: "biometric", label: "Face ID / fingerprint", icon: "fingerprint", pct: -0.05 },
      { key: "charging", label: "Charging port", icon: "power", pct: -0.02 },
      { key: "audio", label: "Speaker / mic", icon: "volume_up", pct: -0.02 },
      { key: "wireless", label: "Wi-Fi / Bluetooth", icon: "wifi", pct: -0.02 },
    ],
  },
  {
    key: "accessories",
    title: "Original accessories",
    subtitle: "Box and bill with matching IMEI increase resale value.",
    badge: "Extra bonus cash",
    kind: "multi",
    options: [
      { key: "box", label: "Original box", hint: "Matching IMEI", icon: "inventory_2", pct: 0.015 },
      { key: "charger", label: "Original charger", hint: "Brand adapter / cable", icon: "power", pct: 0.015 },
      { key: "bill", label: "Valid purchase bill", hint: "GST invoice", icon: "receipt_long", pct: 0.015 },
    ],
  },
  {
    key: "age",
    title: "Device age",
    subtitle: "Time since the phone was first purchased.",
    badge: "Warranty",
    kind: "single",
    options: [
      { key: "under_3", label: "Under 3 months", hint: "Brand warranty active", pct: 0.04 },
      { key: "3_to_11", label: "3 to 11 months", hint: "Remaining brand warranty" },
      { key: "over_11", label: "Above 11 months", hint: "Out of warranty", pct: -0.04 },
    ],
  },
];

const s = (budget: number | null, mid: number | null, flagship: number | null, premium: number | null) => ({
  budget,
  mid,
  flagship,
  premium,
});

export const REPAIR_SERVICES: RepairService[] = [
  { key: "display", name: "Display replacement", description: "Original & premium OLED / LCD grade screens with touch calibration", icon: "smartphone", badge: "180 days warranty", warrantyDays: 180, minutes: 45, prices: s(1499, 2799, 6999, 11999) },
  { key: "battery", name: "Battery replacement", description: "100% capacity certified Li-ion cells", icon: "battery_charging_full", badge: "90 days warranty", warrantyDays: 90, minutes: 30, prices: s(899, 1299, 2299, 3999) },
  { key: "charging_port", name: "Charging port & mic", description: "Sub-board / port replacement and re-soldering", icon: "cable", badge: "90 days warranty", warrantyDays: 90, minutes: 40, prices: s(349, 549, 999, 2499) },
  { key: "camera", name: "Camera & lens", description: "Blur-free optics, lens glass and module replacement", icon: "photo_camera", badge: "Original sensor", warrantyDays: 90, minutes: 40, prices: s(499, 899, 2499, 5999) },
  { key: "water_damage", name: "Water damage treatment", description: "Ultrasonic cleaning & board-level diagnosis", icon: "water_drop", badge: "Full diagnostics", warrantyDays: 30, minutes: 120, prices: s(599, 799, 1299, 1999) },
  { key: "speaker_mic", name: "Speaker, earpiece & mic", description: "Loud ring and clear call audio restored", icon: "volume_up", badge: "Sound tested", warrantyDays: 90, minutes: 30, prices: s(299, 449, 799, 1999) },
  { key: "fingerprint", name: "Fingerprint & Face ID", description: "Biometric sensor repair and calibration", icon: "fingerprint", badge: "Secure sync", warrantyDays: 90, minutes: 60, prices: s(499, 799, 1499, null) },
  { key: "software", name: "Software, updates & FRP", description: "Boot loop fix, OS flashing, updates and unlock", icon: "settings", badge: "Same-day fix", warrantyDays: 30, minutes: 60, prices: s(299, 399, 599, 999) },
  { key: "data_recovery", name: "Data backup & recovery", description: "Backup photos, contacts & WhatsApp; recovery from dead phones", icon: "cloud_sync", badge: "Privacy assured", warrantyDays: 0, minutes: 90, prices: s(499, 699, 999, 1499) },
  { key: "motherboard", name: "Dead phone / motherboard", description: "Chip-level IC, PMIC, short-circuit and reballing repairs", icon: "memory", badge: "Advanced lab", warrantyDays: 90, minutes: 1440, prices: s(null, null, null, null) },
];

export const MOTHERBOARD_DIAGNOSIS_FEE = 199;

export const PRODUCTS: Product[] = [
  { id: "ssg-101", brandSlug: "apple", name: "Apple iPhone 13", variant: "128 GB", color: "Midnight", grade: "superb", batteryHealth: 93, price: 34999, mrp: 59900, warrantyMonths: 6, highlights: ["A15 Bionic", "Face ID OK", "Original box"], description: "Single-owner iPhone 13 in superb condition. Passed our 32-point check with original display and battery.", inBox: ["Phone", "Box", "Type-C to Lightning cable"], tint: "#1f2a37", status: "available" },
  { id: "ssg-102", brandSlug: "samsung", name: "Samsung Galaxy S22 5G", variant: "8 GB / 128 GB", color: "Phantom Black", grade: "superb", batteryHealth: 91, price: 27499, mrp: 72999, warrantyMonths: 6, highlights: ["Snapdragon 8 Gen 1", "Dynamic AMOLED 2X", "Clean IMEI"], description: "Flagship Samsung with a flawless display and GST bill.", inBox: ["Phone", "Box", "Cable"], tint: "#111827", status: "available" },
  { id: "ssg-103", brandSlug: "oneplus", name: "OnePlus 11R 5G", variant: "16 GB / 256 GB", color: "Sonic Black", grade: "good", batteryHealth: 94, price: 25999, mrp: 44999, warrantyMonths: 6, highlights: ["Snapdragon 8+ Gen 1", "120 Hz AMOLED", "100 W charger"], description: "Micro-scratches on the frame only; screen and camera perfect.", inBox: ["Phone", "100 W charger", "Cable"], tint: "#374151", status: "available" },
  { id: "ssg-104", brandSlug: "vivo", name: "Vivo V29 5G", variant: "8 GB / 128 GB", color: "Velvet Red", grade: "superb", batteryHealth: 96, price: 19500, mrp: 32999, warrantyMonths: 6, highlights: ["50 MP OIS camera", "Aura ring light", "3D curved display"], description: "Portrait specialist in superb condition.", inBox: ["Phone", "Box", "Charger", "Cable"], tint: "#7f1d1d", status: "available" },
  { id: "ssg-105", brandSlug: "xiaomi", name: "Redmi Note 12 Pro 5G", variant: "6 GB / 128 GB", color: "Glacier Blue", grade: "superb", batteryHealth: 95, price: 13999, mrp: 24999, warrantyMonths: 6, highlights: ["Sony IMX766 OIS", "120 Hz OLED", "67 W charger"], description: "Great value mid-ranger with 67 W fast charging.", inBox: ["Phone", "67 W charger", "Cable"], tint: "#93c5fd", status: "available" },
  { id: "ssg-106", brandSlug: "realme", name: "Realme 11 Pro 5G", variant: "8 GB / 128 GB", color: "Sunrise Beige", grade: "good", batteryHealth: 92, price: 14200, mrp: 23999, warrantyMonths: 6, highlights: ["100 MP ProLight", "Curved display", "Leather back"], description: "Light wear on the leather back; everything works perfectly.", inBox: ["Phone", "Charger", "Cable"], tint: "#a16207", status: "available" },
  { id: "ssg-107", brandSlug: "apple", name: "Apple iPhone 11", variant: "64 GB", color: "White", grade: "good", batteryHealth: 87, price: 17999, mrp: 43900, warrantyMonths: 6, highlights: ["Original battery", "Face ID active", "Dual camera"], description: "Entry-level iPhone, fully tested with original parts.", inBox: ["Phone", "Cable"], tint: "#e5e7eb", status: "available" },
  { id: "ssg-108", brandSlug: "samsung", name: "Samsung Galaxy M34 5G", variant: "6 GB / 128 GB", color: "Prism Silver", grade: "fair", batteryHealth: 98, price: 10499, mrp: 18999, warrantyMonths: 3, highlights: ["6000 mAh battery", "120 Hz sAMOLED", "50 MP no-shake"], description: "Visible marks on the frame, but battery is nearly new.", inBox: ["Phone", "Cable"], tint: "#cbd5e1", status: "available" },
];

export const GRADE_INFO: Record<Product["grade"], { label: string; title: string; points: string[]; warranty: string }> = {
  superb: { label: "Grade Superb", title: "Like brand new", points: ["Zero scratches or signs of use", "Battery health above 90%", "All original hardware passed"], warranty: "6 months warranty" },
  good: { label: "Grade Good", title: "Smart high-value choice", points: ["2–3 micro scratches (not visible in a case)", "Screen 100% scratch-free", "Battery health 85–94%"], warranty: "6 months warranty" },
  fair: { label: "Grade Fair", title: "Unbeatable budget saver", points: ["Visible cosmetic marks on the body", "Motherboard & cameras fully functional", "Ideal for students & secondary use"], warranty: "3 months warranty" },
};
