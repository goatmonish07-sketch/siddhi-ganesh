import { Icon } from "./Icon";
import { waLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hi, I have a query about my mobile.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-white text-label-lg shadow-float hover:brightness-95"
    >
      <Icon name="chat" fill />
      <span className="hidden sm:inline">WhatsApp Support</span>
    </a>
  );
}
