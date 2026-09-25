import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { AlertCircle, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, FormField, Input, Select, Checkbox, Button } from "@/shared/ui";
import { media } from "@/theme";
import {
  LOCAL_GOVERNMENTS,
  ENTITY_TYPES,
  ENTITY_TYPE_LABELS,
  FACILITY_OPTIONS,
  SERVICE_TYPE_OPTIONS,
  HOTEL_LIKE_TYPES,
  DINING_LIKE_TYPES,
} from "@/shared/content";
import { BranchFieldArray } from "./BranchFieldArray";
import type { BulkEstablishmentsFormValues } from "../schemas/establishment.schema";

export interface EstablishmentFormProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  disabled?: boolean;
  submissionError?: string;
}

/** Coerces an empty input to `undefined` (not `0`/`NaN`) so zod's
 * `.optional()` numeric fields validate against the friendlier
 * entity-type-conditional message from `establishmentSchema`'s
 * `superRefine`, instead of a generic "expected number" error. */
const numberFieldOptions = { setValueAs: (value: string) => (value === "" ? undefined : Number(value)) };

const RowHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const RowSubtitle = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const ErrorNotice = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
  line-height: 1.4;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WideField = styled.div`
  grid-column: 1 / -1;
`;

const CheckboxRow = styled.div`
  margin-bottom: 1rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const EstablishmentForm = ({
  index,
  onRemove,
  canRemove,
  disabled,
  submissionError,
}: EstablishmentFormProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BulkEstablishmentsFormValues>();

  const rowErrors = errors.establishments?.[index];
  const entityType = watch(`establishments.${index}.entityType`);
  const businessName = watch(`establishments.${index}.businessName`);
  const hasWebsite = watch(`establishments.${index}.hasWebsite`);
  const facilities = watch(`establishments.${index}.facilities`) ?? [];
  const serviceTypes = watch(`establishments.${index}.serviceTypes`) ?? [];

  const isHotelLike = HOTEL_LIKE_TYPES.includes(entityType);
  const isDiningLike = DINING_LIKE_TYPES.includes(entityType);

  const toggleArrayValue = (field: "facilities" | "serviceTypes", value: string, checked: boolean) => {
    const current = field === "facilities" ? facilities : serviceTypes;
    const next = checked ? [...current, value] : current.filter((item) => item !== value);
    setValue(`establishments.${index}.${field}`, next, { shouldDirty: true });
  };

  return (
    <Card>
      <CardHeader>
        <RowHeader>
          <div>
            <CardTitle>Business #{index + 1}</CardTitle>
            <RowSubtitle>
              {businessName || "Unnamed business"} &middot; {ENTITY_TYPE_LABELS[entityType]}
            </RowSubtitle>
          </div>
          {canRemove && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              disabled={disabled}
              onClick={onRemove}
              aria-label="Remove business"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </RowHeader>
      </CardHeader>

      <CardContent>
        {submissionError && (
          <ErrorNotice>
            <AlertCircle size={16} />
            <span>{submissionError}</span>
          </ErrorNotice>
        )}

        <Grid>
          <FormField label="Entity type" required error={rowErrors?.entityType?.message}>
            <Select disabled={disabled} {...register(`establishments.${index}.entityType`)}>
              {ENTITY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {ENTITY_TYPE_LABELS[type]}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Business name" required error={rowErrors?.businessName?.message}>
            <Input disabled={disabled} placeholder="e.g. Grand Hotel" {...register(`establishments.${index}.businessName`)} />
          </FormField>
          <FormField label="Business phone" required error={rowErrors?.businessPhoneNumber?.message}>
            <Input
              disabled={disabled}
              placeholder="0803XXXXXXX"
              {...register(`establishments.${index}.businessPhoneNumber`)}
            />
          </FormField>
          <FormField label="Business email" required error={rowErrors?.businessEmail?.message}>
            <Input type="email" disabled={disabled} {...register(`establishments.${index}.businessEmail`)} />
          </FormField>
          <FormField label="Local government" required error={rowErrors?.localGovernment?.message}>
            <Select disabled={disabled} {...register(`establishments.${index}.localGovernment`)}>
              <option value="">Select LGA</option>
              {LOCAL_GOVERNMENTS.map((lg) => (
                <option key={lg} value={lg}>
                  {lg}
                </option>
              ))}
            </Select>
          </FormField>
          <WideField>
            <FormField label="Address" required error={rowErrors?.address?.message}>
              <Input disabled={disabled} {...register(`establishments.${index}.address`)} />
            </FormField>
          </WideField>
          <FormField label="Year established" required error={rowErrors?.yearEstablished?.message}>
            <Input
              type="number"
              disabled={disabled}
              {...register(`establishments.${index}.yearEstablished`, numberFieldOptions)}
            />
          </FormField>
          <FormField label="Contact name" required error={rowErrors?.contactName?.message}>
            <Input disabled={disabled} {...register(`establishments.${index}.contactName`)} />
          </FormField>
          <FormField label="Contact phone" required error={rowErrors?.contactPhoneNumber?.message}>
            <Input
              disabled={disabled}
              placeholder="0803XXXXXXX"
              {...register(`establishments.${index}.contactPhoneNumber`)}
            />
          </FormField>
          <FormField label="Contact email" required error={rowErrors?.contactEmail?.message}>
            <Input type="email" disabled={disabled} {...register(`establishments.${index}.contactEmail`)} />
          </FormField>
        </Grid>

        <CheckboxRow>
          <Checkbox
            disabled={disabled}
            label="This business has a website"
            {...register(`establishments.${index}.hasWebsite`)}
          />
        </CheckboxRow>

        {hasWebsite && (
          <CheckboxRow>
            <FormField label="Website URL" required error={rowErrors?.website?.message}>
              <Input disabled={disabled} placeholder="https://example.com" {...register(`establishments.${index}.website`)} />
            </FormField>
          </CheckboxRow>
        )}

        {isHotelLike && (
          <>
            <Grid>
              <FormField label="Room count" required error={rowErrors?.roomCount?.message}>
                <Input
                  type="number"
                  min={1}
                  disabled={disabled}
                  {...register(`establishments.${index}.roomCount`, numberFieldOptions)}
                />
              </FormField>
              <FormField label="Bed spaces" required error={rowErrors?.bedSpaces?.message}>
                <Input
                  type="number"
                  min={1}
                  disabled={disabled}
                  {...register(`establishments.${index}.bedSpaces`, numberFieldOptions)}
                />
              </FormField>
            </Grid>
            <FormField label="Facilities" optional>
              <CheckboxGrid>
                {FACILITY_OPTIONS.map((facility) => (
                  <Checkbox
                    key={facility}
                    disabled={disabled}
                    label={facility}
                    checked={facilities.includes(facility)}
                    onChange={(event) => toggleArrayValue("facilities", facility, event.target.checked)}
                  />
                ))}
              </CheckboxGrid>
            </FormField>
          </>
        )}

        {isDiningLike && (
          <>
            <Grid>
              <FormField label="Seating capacity" required error={rowErrors?.seatingCapacity?.message}>
                <Input
                  type="number"
                  min={1}
                  disabled={disabled}
                  {...register(`establishments.${index}.seatingCapacity`, numberFieldOptions)}
                />
              </FormField>
            </Grid>
            <FormField label="Service types" optional>
              <CheckboxGrid>
                {SERVICE_TYPE_OPTIONS.map((service) => (
                  <Checkbox
                    key={service}
                    disabled={disabled}
                    label={service}
                    checked={serviceTypes.includes(service)}
                    onChange={(event) => toggleArrayValue("serviceTypes", service, event.target.checked)}
                  />
                ))}
              </CheckboxGrid>
            </FormField>
          </>
        )}

        <BranchFieldArray establishmentIndex={index} disabled={disabled} />
      </CardContent>
    </Card>
  );
};
