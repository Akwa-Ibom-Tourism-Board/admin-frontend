import { Badge, registrationStatusVariant } from "@/shared/ui";
import type { RegistrationStatus } from "../types";

export const StatusBadge = ({ status }: { status: RegistrationStatus }) => (
  <Badge variant={registrationStatusVariant[status] ?? "neutral"}>{status}</Badge>
);
