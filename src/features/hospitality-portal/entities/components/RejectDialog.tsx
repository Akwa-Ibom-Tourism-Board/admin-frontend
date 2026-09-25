import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Dialog, DialogContent, Button, FormField, Textarea } from "@/shared/ui";
import { rejectSchema, type RejectFormValues } from "../schemas/reject.schema";

export interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessName: string;
  onSubmit: (rejectionReason: string) => void | Promise<void>;
  loading?: boolean;
}

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Message = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const RejectDialog = ({ open, onOpenChange, businessName, onSubmit, loading }: RejectDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectFormValues>({ resolver: zodResolver(rejectSchema) });

  if (!open) return null;

  const submit = async (values: RejectFormValues) => {
    await onSubmit(values.rejectionReason);
    reset();
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent maxWidth="28rem">
        <Title>Reject establishment</Title>
        <Message>
          Explain why <strong>{businessName}</strong> is being rejected. This reason is shown to the applicant.
        </Message>
        <Form onSubmit={handleSubmit(submit)} noValidate>
          <FormField label="Rejection reason" required error={errors.rejectionReason?.message}>
            <Textarea
              rows={4}
              placeholder="At least 10 characters explaining the rejection…"
              {...register("rejectionReason")}
            />
          </FormField>
          <Footer>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" loading={loading}>
              Reject
            </Button>
          </Footer>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
