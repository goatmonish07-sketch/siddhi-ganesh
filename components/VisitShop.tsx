import { Icon } from "./Icon";
import { Container } from "./Section";
import { SHOP, fullAddress } from "@/lib/shop";
import { waLink } from "@/lib/whatsapp";

export function VisitShop() {
  return (
    <section className="py-12 lg:py-16 bg-surface-container-low border-t border-hairline">
      <Container className="grid lg:grid-cols-2 gap-6 items-stretch">
        <div className="rounded-2xl overflow-hidden border border-hairline min-h-72 bg-surface-container">
          <iframe
            title={`Map to ${SHOP.name}`}
            src={SHOP.mapsEmbed}
            className="w-full h-full min-h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-2xl bg-white border border-hairline p-6 flex flex-col justify-between gap-6">
          <div>
            <div className="text-label-sm uppercase tracking-widest text-muted">Physical store visit</div>
            <h2 className="text-[26px] leading-9 sm:text-headline-lg font-bold text-on-surface mt-1">Walk into our Cheyyar shop</h2>
            <p className="text-body-md text-on-surface-variant mt-2">
              Meet {SHOP.owner} and our repair technicians in person. Test phones, watch your repair on the bench and get paid on the spot.
            </p>
          </div>
          <ul className="space-y-3 text-body-md text-on-surface">
            <li className="flex gap-3"><Icon name="location_on" className="text-muted" /> {fullAddress} ({SHOP.landmark})</li>
            <li className="flex gap-3"><Icon name="call" className="text-muted" /> {SHOP.phoneDisplay}</li>
            <li className="flex gap-3"><Icon name="schedule" className="text-muted" /> {SHOP.hours}</li>
            <li className="flex gap-3"><Icon name="payments" className="text-muted" /> Cash · UPI (GPay / PhonePe / Paytm) · Bank transfer</li>
          </ul>
          <div className="grid sm:grid-cols-3 gap-2">
            <a href={`tel:+91${SHOP.phone}`} className="flex items-center justify-center gap-2 rounded-lg bg-primary-container text-white py-3 text-label-lg min-h-12">
              <Icon name="call" /> Call
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-whatsapp text-on-surface py-3 text-label-lg min-h-12">
              <Icon name="chat" /> WhatsApp
            </a>
            <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-hairline text-on-surface py-3 text-label-lg min-h-12">
              <Icon name="directions" /> Directions
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
