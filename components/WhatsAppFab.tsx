import { Icon } from "./Icon";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hi, I have a query about my mobile.")}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-on-surface text-label-lg shadow-float hover:brightness-95"
    >
      <Icon name="chat" fill />
      <span>WhatsApp Support</span>
    </a>
  );
}
