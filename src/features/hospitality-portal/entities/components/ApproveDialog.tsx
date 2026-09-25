import styled from "styled-components";
import { Dialog, DialogContent, Button } from "@/shared/ui";

export interface ApproveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
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

/** A one-click confirm for approving an establishment — no extra input
 * needed, unlike rejection which requires a reason. */
export const ApproveDialog = ({ open, onOpenChange, businessName, onConfirm, loading }: ApproveDialogProps) => {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="26rem">
        <Title>Approve establishment</Title>
        <Message>
          Approve <strong>{businessName}</strong>? This marks the registration as approved and makes it a
          recognized establishment.
        </Message>
        <Footer>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" loading={loading} onClick={onConfirm}>
            Approve
          </Button>
        </Footer>
      </DialogContent>
    </Dialog>
  );
};
