import { Icon } from "./Icon";
import { Container } from "./Section";
import { SHOP, fullAddress } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";

export function VisitShop() {
  return (
    <section className="py-12 bg-white">
      <Container className="grid lg:grid-cols-2 gap-6 items-stretch">
        <div className="rounded-2xl overflow-hidden border border-hairline shadow-card min-h-72 bg-surface-container">
          <iframe
            title={`Map to ${SHOP.name}`}
            src={SHOP.mapsEmbed}
            className="w-full h-full min-h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-2xl bg-primary-container text-white p-6 flex flex-col justify-between gap-6 shadow-float">
          <div>
            <div className="text-label-sm uppercase tracking-widest text-gold">Physical store visit</div>
            <h2 className="text-headline-lg text-[26px] sm:text-[32px] font-bold mt-1">Walk into our Cheyyar shop</h2>
            <p className="text-body-md text-primary-fixed-dim mt-2">
              Meet {SHOP.owner} and our repair technicians in person. Test phones, watch your repair on the bench and get paid on the spot.
            </p>
          </div>
          <ul className="space-y-3 text-body-md">
            <li className="flex gap-3"><Icon name="location_on" className="text-gold" /> {fullAddress} ({SHOP.landmark})</li>
            <li className="flex gap-3"><Icon name="call" className="text-gold" /> {SHOP.phoneDisplay}</li>
            <li className="flex gap-3"><Icon name="schedule" className="text-gold" /> {SHOP.hours}</li>
            <li className="flex gap-3"><Icon name="payments" className="text-gold" /> Cash · UPI (GPay / PhonePe / Paytm) · Bank transfer</li>
          </ul>
          <div className="grid sm:grid-cols-3 gap-2">
            <a href={`tel:+91${SHOP.phone}`} className="flex items-center justify-center gap-2 rounded-lg bg-white text-primary py-3 text-label-lg">
              <Icon name="call" /> Call
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-secondary-container text-on-secondary-fixed py-3 text-label-lg">
              <Icon name="chat" /> WhatsApp
            </a>
            <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-white/30 py-3 text-label-lg">
              <Icon name="directions" /> Directions
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
