import { useCallback, useState } from "react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
}

export interface ConfirmState extends ConfirmOptions {
  open: boolean;
}

/** Drives a single shared confirmation dialog for simple proceed/cancel
 * flows (logout, approve). Reject-with-reason has its own dedicated dialog
 * since it needs a text input, not just a yes/no. */
export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const ask = useCallback((options: ConfirmOptions) => {
    setState({ ...options, open: true });
  }, []);

  const close = useCallback(() => {
    setState((prev) => (prev ? { ...prev, open: false } : null));
  }, []);

  return { state, ask, close };
}
