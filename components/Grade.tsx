import type { Grade } from "@/lib/types";
import { GRADE_INFO } from "@/lib/catalog";
import { Icon } from "./Icon";

const STYLE: Record<Grade, string> = {
  superb: "bg-on-surface text-champagne",
  good: "bg-white text-on-surface border border-hairline",
  fair: "bg-white text-on-surface-variant border border-hairline",
};

export function GradeBadge({ grade }: { grade: Grade }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm uppercase ${STYLE[grade]}`}>
      <Icon name="verified" className="text-[12px]" fill />
      {GRADE_INFO[grade].label}
    </span>
  );
}
