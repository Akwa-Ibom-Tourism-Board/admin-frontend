import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { X } from "lucide-react";
import { fadeIn } from "@/theme";

interface DialogContextValue {
  onOpenChange: (open: boolean) => void;
}

const DialogCtx = createContext<DialogContextValue | null>(null);

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  return <DialogCtx.Provider value={{ onOpenChange }}>{children}</DialogCtx.Provider>;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} ${({ theme }) => theme.transitions.fast};
`;

const Content = styled.div<{ $maxWidth?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2rem);
  max-width: ${({ $maxWidth }) => $maxWidth ?? "28rem"};
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  background: none;
  border: none;
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const DialogContent = ({
  children,
  hideClose,
  maxWidth,
}: {
  children: ReactNode;
  hideClose?: boolean;
  maxWidth?: string;
}) => {
  const ctx = useContext(DialogCtx);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") ctx?.onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [ctx]);

  return createPortal(
    <>
      <Overlay onClick={() => ctx?.onOpenChange(false)} />
      <Content role="dialog" aria-modal="true" $maxWidth={maxWidth}>
        {children}
        {!hideClose && (
          <CloseButton aria-label="Close" onClick={() => ctx?.onOpenChange(false)} type="button">
            <X size={16} />
          </CloseButton>
        )}
      </Content>
    </>,
    document.body,
  );
};
