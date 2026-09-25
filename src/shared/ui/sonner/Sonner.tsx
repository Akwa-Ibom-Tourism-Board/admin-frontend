import { Toaster as SonnerPrimitive, toast } from "sonner";
import { useThemeMode } from "@/theme";

export const Toaster = () => {
  const { mode } = useThemeMode();
  return <SonnerPrimitive position="top-right" richColors theme={mode} />;
};

export { toast };
