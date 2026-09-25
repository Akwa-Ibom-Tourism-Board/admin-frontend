import { useState } from "react";
import styled from "styled-components";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import type { ConfirmState } from "@/shared/hooks/useConfirm";

export interface ConfirmModalProps {
  state: ConfirmState | null;
  onClose: () => void;
}

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Message = styled.p`
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const ConfirmModal = ({ state, onClose }: ConfirmModalProps) => {
  const [loading, setLoading] = useState(false);

  if (!state) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await state.onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={state.open} onOpenChange={onClose}>
      <DialogContent maxWidth="26rem">
        <Title>{state.title}</Title>
        <Message>{state.message}</Message>
        <Footer>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {state.cancelLabel ?? "Cancel"}
          </Button>
          <Button
            variant={state.variant === "destructive" ? "destructive" : "primary"}
            loading={loading}
            onClick={handleConfirm}
          >
            {state.confirmLabel ?? "Confirm"}
          </Button>
        </Footer>
      </DialogContent>
    </Dialog>
  );
};
