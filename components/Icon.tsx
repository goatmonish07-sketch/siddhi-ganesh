import {
  ArrowLeftRight, ArrowRight, BadgeCheck, Banknote, BatteryCharging, BatteryFull, BatteryWarning, BookmarkCheck, Cable, Camera,
  ChevronDown, Circle, CircleCheck, CircleCheckBig, ClipboardCheck, Clock, Cpu, DatabaseBackup, Droplet, Eraser, Fingerprint,
  Handshake, ImageOff, IndianRupee, Info, Lock, MapPin, Menu, MessageCircle, Navigation, Package, Phone, Power, PowerOff, Receipt,
  RefreshCw, Repeat, ScanLine, Search, Settings, Shield, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Stethoscope, Store,
  Truck, TriangleAlert, LoaderCircle, ArrowDown, Volume2, Wifi, Wrench, X, Zap, Check, CalendarX, type LucideIcon,
} from "lucide-react";

// Icon names follow Material Symbols so they can be stored as plain strings
// (e.g. repair_services.icon in Supabase); they render as bundled SVGs.
const ICONS: Record<string, LucideIcon> = {
  arrow_forward: ArrowRight,
  autorenew: RefreshCw,
  battery_alert: BatteryWarning,
  battery_charging_full: BatteryCharging,
  battery_full: BatteryFull,
  blur_linear: ScanLine,
  bolt: Zap,
  bookmark_added: BookmarkCheck,
  broken_image: ImageOff,
  build: Wrench,
  cable: Cable,
  call: Phone,
  chat: MessageCircle,
  check: Check,
  check_circle: CircleCheck,
  close: X,
  cloud_sync: DatabaseBackup,
  currency_exchange: ArrowLeftRight,
  currency_rupee: IndianRupee,
  delete_sweep: Eraser,
  directions: Navigation,
  electric_bolt: Zap,
  event_busy: CalendarX,
  expand_more: ChevronDown,
  fact_check: ClipboardCheck,
  fingerprint: Fingerprint,
  handshake: Handshake,
  home_repair_service: Stethoscope,
  info: Info,
  inventory_2: Package,
  local_shipping: Truck,
  location_on: MapPin,
  lock: Lock,
  memory: Cpu,
  menu: Menu,
  payments: Banknote,
  photo_camera: Camera,
  power: Power,
  progress: LoaderCircle,
  arrow_downward: ArrowDown,
  power_off: PowerOff,
  radio_button_unchecked: Circle,
  receipt_long: Receipt,
  schedule: Clock,
  search: Search,
  settings: Settings,
  shield: Shield,
  shopping_bag: ShoppingBag,
  smartphone: Smartphone,
  storefront: Store,
  swap_horiz: Repeat,
  task_alt: CircleCheckBig,
  texture: Sparkles,
  verified: BadgeCheck,
  verified_user: ShieldCheck,
  volume_up: Volume2,
  warning: TriangleAlert,
  water_drop: Droplet,
  wifi: Wifi,
};

/**
 * Pass the size the way the design did for its icon font — a `text-[20px]` class —
 * and it becomes the SVG size (default 20px). `fill` gives the solid variant for selected states.
 */
export function Icon({ name, className = "", fill = false }: { name: string; className?: string; fill?: boolean }) {
  const Cmp = ICONS[name] ?? Circle;
  const size = Number(/text-\[(\d+)px\]/.exec(className)?.[1] ?? 20);
  return (
    <Cmp
      aria-hidden="true"
      size={size}
      className={`inline-block shrink-0 ${className}`}
      strokeWidth={fill ? 2.25 : 1.75}
      fill={fill ? "currentColor" : "none"}
      fillOpacity={fill ? 0.15 : undefined}
    />
  );
}
