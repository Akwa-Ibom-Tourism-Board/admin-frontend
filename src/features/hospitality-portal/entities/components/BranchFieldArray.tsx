import { useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { Plus, Trash2 } from "lucide-react";
import { Button, FormField, Input, Select } from "@/shared/ui";
import { media } from "@/theme";
import { LOCAL_GOVERNMENTS } from "@/shared/content";
import { createEmptyBranch, type BulkEstablishmentsFormValues } from "../schemas/establishment.schema";

export interface BranchFieldArrayProps {
  establishmentIndex: number;
  disabled?: boolean;
}

const Wrapper = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const HeaderTitle = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const BranchRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const BranchGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.875rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const BranchFieldArray = ({ establishmentIndex, disabled }: BranchFieldArrayProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<BulkEstablishmentsFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `establishments.${establishmentIndex}.branches`,
  });

  const branchErrors = errors.establishments?.[establishmentIndex]?.branches;

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>Branches (optional)</HeaderTitle>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={disabled}
          onClick={() => append(createEmptyBranch())}
        >
          <Plus size={14} /> Add branch
        </Button>
      </Header>

      {fields.map((field, branchIndex) => {
        const prefix = `establishments.${establishmentIndex}.branches.${branchIndex}` as const;
        const rowErrors = branchErrors?.[branchIndex];

        return (
          <BranchRow key={field.id}>
            <BranchGrid>
              <FormField label="Branch name" optional error={rowErrors?.businessName?.message}>
                <Input disabled={disabled} placeholder="e.g. Uyo Branch" {...register(`${prefix}.businessName`)} />
              </FormField>
              <FormField label="Address" required error={rowErrors?.address?.message}>
                <Input disabled={disabled} {...register(`${prefix}.address`)} />
              </FormField>
              <FormField label="Local government" required error={rowErrors?.localGovernment?.message}>
                <Select disabled={disabled} {...register(`${prefix}.localGovernment`)}>
                  <option value="">Select LGA</option>
                  {LOCAL_GOVERNMENTS.map((lg) => (
                    <option key={lg} value={lg}>
                      {lg}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField label="Business phone" required error={rowErrors?.businessPhoneNumber?.message}>
                <Input disabled={disabled} placeholder="0803XXXXXXX" {...register(`${prefix}.businessPhoneNumber`)} />
              </FormField>
              <FormField label="Contact name" required error={rowErrors?.contactName?.message}>
                <Input disabled={disabled} {...register(`${prefix}.contactName`)} />
              </FormField>
              <FormField label="Contact phone" required error={rowErrors?.contactPhoneNumber?.message}>
                <Input disabled={disabled} placeholder="0803XXXXXXX" {...register(`${prefix}.contactPhoneNumber`)} />
              </FormField>
              <FormField label="Contact email" required error={rowErrors?.contactEmail?.message}>
                <Input type="email" disabled={disabled} {...register(`${prefix}.contactEmail`)} />
              </FormField>
            </BranchGrid>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={disabled}
              onClick={() => remove(branchIndex)}
              aria-label="Remove branch"
            >
              <Trash2 size={16} />
            </Button>
          </BranchRow>
        );
      })}
    </Wrapper>
  );
};
