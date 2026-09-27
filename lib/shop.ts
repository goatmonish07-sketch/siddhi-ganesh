export const SHOP = {
  name: "Sri Siddhi Ganesh Mobiles",
  legalName: "Sri Siddhi Ganesh Mobiles and Service",
  tagline: "Trusted Service. Lasting Connection.",
  owner: "M Vishal Jain",
  phone: "9677048747",
  phoneDisplay: "+91 96770 48747",
  whatsapp: "919677048747",
  street: "46, Loganadhan Street",
  landmark: "Near Bus Stand",
  city: "Cheyyar",
  district: "Tiruvannamalai",
  state: "Tamil Nadu",
  pincode: "604407",
  hours: "Open daily, 9:30 AM – 9:30 PM",
  serviceArea: ["Cheyyar", "Vandavasi", "Arani", "Tiruvannamalai"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=46+Loganadhan+Street+Cheyyar+604407",
  mapsEmbed: "https://www.google.com/maps?q=46+Loganadhan+Street+Cheyyar+604407&output=embed",
} as const;

export const fullAddress = `${SHOP.street}, ${SHOP.city}, ${SHOP.district} Dt, ${SHOP.state} – ${SHOP.pincode}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://srisiddhiganeshmobiles.in";

export const TIME_SLOTS = ["10 AM – 12 PM", "12 PM – 2 PM", "2 PM – 5 PM", "5 PM – 8 PM"] as const;

export function formatINR(value: number): string {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}
