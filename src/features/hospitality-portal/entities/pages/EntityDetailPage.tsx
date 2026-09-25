import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { AlertCircle, ArrowLeft, Building2, CheckCircle2, GitBranch, Pencil, Save, X, XCircle } from "lucide-react";
import { PageHeader, PageLoader, EmptyState } from "@/shared/components";
import { Button, Card, CardHeader, CardTitle, CardContent, FormField, Input, Select, Checkbox } from "@/shared/ui";
import {
  ENTITY_TYPE_LABELS,
  LOCAL_GOVERNMENTS,
  FACILITY_OPTIONS,
  SERVICE_TYPE_OPTIONS,
  HOTEL_LIKE_TYPES,
  DINING_LIKE_TYPES,
} from "@/shared/content";
import { media } from "@/theme";
import { StatusBadge } from "../components/StatusBadge";
import { ApproveDialog } from "../components/ApproveDialog";
import { RejectDialog } from "../components/RejectDialog";
import { useApproveEstablishment, useEstablishment, useRejectEstablishment, useUpdateEstablishment } from "../api";
import { establishmentSchema, type EstablishmentFormValues } from "../schemas/establishment.schema";
import type { EstablishmentUpdatePayload } from "../types";

const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const Meta = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const RejectionNotice = styled.div`
  padding: 0.875rem 1rem;
  margin-bottom: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
  line-height: 1.5;
`;

const BranchNotice = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  margin-bottom: 1.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.info.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.info.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const BranchCardLink = styled.button`
  all: unset;
  cursor: pointer;
  display: block;
  width: 100%;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${media.lg} {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Value = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  word-break: break-word;
`;

const Muted = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const SaveBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BranchCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.375rem;
  padding: 0.875rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: left;
  transition: border-color ${({ theme }) => theme.transitions.fast}, background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }

  & + & {
    margin-top: 0.75rem;
  }
`;

const numberFieldOptions = { setValueAs: (value: string) => (value === "" ? undefined : Number(value)) };

export const EntityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: establishment, isLoading } = useEstablishment(id);

  const [editing, setEditing] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const { mutateAsync: approve, isPending: isApproving } = useApproveEstablishment();
  const { mutateAsync: reject, isPending: isRejecting } = useRejectEstablishment();
  const { mutateAsync: update, isPending: isSaving } = useUpdateEstablishment();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EstablishmentFormValues>({ resolver: zodResolver(establishmentSchema) });

  useEffect(() => {
    if (!establishment) return;
    reset({
      entityType: establishment.entityType,
      businessName: establishment.businessName ?? "",
      businessPhoneNumber: establishment.businessPhoneNumber ?? "",
      address: establishment.address ?? "",
      localGovernment: establishment.localGovernment ?? "",
      hasWebsite: establishment.hasWebsite,
      website: establishment.website ?? "",
      yearEstablished: establishment.yearEstablished ?? new Date().getFullYear(),
      contactName: establishment.contactName ?? "",
      contactPhoneNumber: establishment.contactPhoneNumber ?? "",
      contactEmail: establishment.contactEmail ?? "",
      businessEmail: establishment.businessEmail ?? "",
      roomCount: establishment.roomCount ?? undefined,
      bedSpaces: establishment.bedSpaces ?? undefined,
      facilities: establishment.facilities ?? [],
      seatingCapacity: establishment.seatingCapacity ?? undefined,
      serviceTypes: establishment.serviceTypes ?? [],
    } as unknown as EstablishmentFormValues);
  }, [establishment, reset]);

  if (isLoading) {
    return <PageLoader title="Loading establishment…" />;
  }

  if (!establishment) {
    return (
      <EmptyState
        icon={Building2}
        title="Establishment not found"
        message="This establishment doesn't exist or may have been removed."
        action={{ label: "Back to entities", onClick: () => navigate("/hospitality-portal/entities") }}
      />
    );
  }

  const isPendingStatus = establishment.registrationStatus === "Pending";
  const isHotelLike = HOTEL_LIKE_TYPES.includes(establishment.entityType);
  const isDiningLike = DINING_LIKE_TYPES.includes(establishment.entityType);

  const facilities = watch("facilities") ?? [];
  const serviceTypes = watch("serviceTypes") ?? [];
  const hasWebsite = watch("hasWebsite");

  const toggleArrayValue = (field: "facilities" | "serviceTypes", value: string, checked: boolean) => {
    const current = field === "facilities" ? facilities : serviceTypes;
    setValue(field, checked ? [...current, value] : current.filter((item) => item !== value), {
      shouldDirty: true,
    });
  };

  const cancelEdit = () => {
    setEditing(false);
    reset({
      entityType: establishment.entityType,
      businessName: establishment.businessName ?? "",
      businessPhoneNumber: establishment.businessPhoneNumber ?? "",
      address: establishment.address ?? "",
      localGovernment: establishment.localGovernment ?? "",
      hasWebsite: establishment.hasWebsite,
      website: establishment.website ?? "",
      yearEstablished: establishment.yearEstablished ?? new Date().getFullYear(),
      contactName: establishment.contactName ?? "",
      contactPhoneNumber: establishment.contactPhoneNumber ?? "",
      contactEmail: establishment.contactEmail ?? "",
      businessEmail: establishment.businessEmail ?? "",
      roomCount: establishment.roomCount ?? undefined,
      bedSpaces: establishment.bedSpaces ?? undefined,
      facilities: establishment.facilities ?? [],
      seatingCapacity: establishment.seatingCapacity ?? undefined,
      serviceTypes: establishment.serviceTypes ?? [],
    } as unknown as EstablishmentFormValues);
  };

  const onSave = async (values: EstablishmentFormValues) => {
    const payload: EstablishmentUpdatePayload = {
      businessName: values.businessName,
      businessPhoneNumber: values.businessPhoneNumber,
      address: values.address,
      localGovernment: values.localGovernment,
      hasWebsite: values.hasWebsite,
      website: values.hasWebsite ? values.website : undefined,
      yearEstablished: values.yearEstablished,
      contactName: values.contactName,
      contactPhoneNumber: values.contactPhoneNumber,
      contactEmail: values.contactEmail,
      businessEmail: values.businessEmail,
      roomCount: values.roomCount,
      bedSpaces: values.bedSpaces,
      facilities: values.facilities,
      seatingCapacity: values.seatingCapacity,
      serviceTypes: values.serviceTypes,
    };

    try {
      await update({ id: establishment.id, payload });
      setEditing(false);
    } catch {
      // The mutation hook already surfaces an error toast.
    }
  };

  return (
    <div>
      <PageHeader
        title={establishment.businessName ?? "Establishment"}
        subtitle={establishment.uniqueBusinessId ?? undefined}
        action={
          <HeaderActions>
            <Button variant="outline" onClick={() => navigate("/hospitality-portal/entities")}>
              <ArrowLeft size={16} /> Back
            </Button>
            {isPendingStatus && !editing && (
              <>
                <Button variant="outline" onClick={() => setApproveOpen(true)}>
                  <CheckCircle2 size={16} /> Approve
                </Button>
                <Button variant="destructive" onClick={() => setRejectOpen(true)}>
                  <XCircle size={16} /> Reject
                </Button>
              </>
            )}
            {!editing ? (
              <Button onClick={() => setEditing(true)}>
                <Pencil size={16} /> Edit
              </Button>
            ) : (
              <Button variant="ghost" onClick={cancelEdit}>
                <X size={16} /> Cancel
              </Button>
            )}
          </HeaderActions>
        }
      />

      <TopRow>
        <StatusBadge status={establishment.registrationStatus} />
        <Meta>{ENTITY_TYPE_LABELS[establishment.entityType]}</Meta>
      </TopRow>

      {establishment.parent && (
        <BranchNotice to={`/hospitality-portal/entities/${establishment.parent.id}`}>
          <GitBranch size={16} />
          This is a branch of {establishment.parent.businessName ?? "another business"}
          {establishment.parent.uniqueBusinessId ? ` (${establishment.parent.uniqueBusinessId})` : ""} — view parent
        </BranchNotice>
      )}

      {establishment.rejectionReason && (
        <RejectionNotice>
          <AlertCircle size={14} style={{ verticalAlign: "-2px", marginRight: "0.375rem" }} />
          <strong>Rejection reason:</strong> {establishment.rejectionReason}
        </RejectionNotice>
      )}

      <form onSubmit={handleSubmit(onSave)} noValidate>
        <Grid2>
          <Card>
            <CardHeader>
              <CardTitle>Business information</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGrid>
                <FormField label="Business name" error={editing ? errors.businessName?.message : undefined}>
                  {editing ? (
                    <Input {...register("businessName")} />
                  ) : (
                    <Value>{establishment.businessName ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Unique business ID">
                  <Value>{establishment.uniqueBusinessId ?? "—"}</Value>
                </FormField>
                <FormField label="Year established" error={editing ? errors.yearEstablished?.message : undefined}>
                  {editing ? (
                    <Input type="number" {...register("yearEstablished", numberFieldOptions)} />
                  ) : (
                    <Value>{establishment.yearEstablished ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Local government" error={editing ? errors.localGovernment?.message : undefined}>
                  {editing ? (
                    <Select {...register("localGovernment")}>
                      <option value="">Select LGA</option>
                      {LOCAL_GOVERNMENTS.map((lg) => (
                        <option key={lg} value={lg}>
                          {lg}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Value>{establishment.localGovernment ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Address" error={editing ? errors.address?.message : undefined}>
                  {editing ? <Input {...register("address")} /> : <Value>{establishment.address ?? "—"}</Value>}
                </FormField>
              </FieldGrid>

              <FieldGrid style={{ marginTop: "1rem" }}>
                <FormField label="Business phone" error={editing ? errors.businessPhoneNumber?.message : undefined}>
                  {editing ? (
                    <Input {...register("businessPhoneNumber")} />
                  ) : (
                    <Value>{establishment.businessPhoneNumber ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Business email" error={editing ? errors.businessEmail?.message : undefined}>
                  {editing ? (
                    <Input type="email" {...register("businessEmail")} />
                  ) : (
                    <Value>{establishment.businessEmail ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Contact name" error={editing ? errors.contactName?.message : undefined}>
                  {editing ? (
                    <Input {...register("contactName")} />
                  ) : (
                    <Value>{establishment.contactName ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Contact phone" error={editing ? errors.contactPhoneNumber?.message : undefined}>
                  {editing ? (
                    <Input {...register("contactPhoneNumber")} />
                  ) : (
                    <Value>{establishment.contactPhoneNumber ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Contact email" error={editing ? errors.contactEmail?.message : undefined}>
                  {editing ? (
                    <Input type="email" {...register("contactEmail")} />
                  ) : (
                    <Value>{establishment.contactEmail ?? "—"}</Value>
                  )}
                </FormField>
                <FormField label="Phone verified">
                  <Value>{establishment.phoneVerified ? "Yes" : "No"}</Value>
                </FormField>
              </FieldGrid>

              <div style={{ marginTop: "1rem" }}>
                {editing ? (
                  <Checkbox label="This business has a website" {...register("hasWebsite")} />
                ) : (
                  <FormField label="Website">
                    <Value>{establishment.hasWebsite && establishment.website ? establishment.website : "—"}</Value>
                  </FormField>
                )}
                {editing && hasWebsite && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <FormField label="Website URL" error={errors.website?.message}>
                      <Input {...register("website")} />
                    </FormField>
                  </div>
                )}
              </div>

              {(isHotelLike || isDiningLike) && (
                <div style={{ marginTop: "1.25rem" }}>
                  <FieldGrid>
                    {isHotelLike && (
                      <>
                        <FormField label="Room count" error={editing ? errors.roomCount?.message : undefined}>
                          {editing ? (
                            <Input type="number" min={1} {...register("roomCount", numberFieldOptions)} />
                          ) : (
                            <Value>{establishment.roomCount ?? "—"}</Value>
                          )}
                        </FormField>
                        <FormField label="Bed spaces" error={editing ? errors.bedSpaces?.message : undefined}>
                          {editing ? (
                            <Input type="number" min={1} {...register("bedSpaces", numberFieldOptions)} />
                          ) : (
                            <Value>{establishment.bedSpaces ?? "—"}</Value>
                          )}
                        </FormField>
                      </>
                    )}
                    {isDiningLike && (
                      <FormField label="Seating capacity" error={editing ? errors.seatingCapacity?.message : undefined}>
                        {editing ? (
                          <Input type="number" min={1} {...register("seatingCapacity", numberFieldOptions)} />
                        ) : (
                          <Value>{establishment.seatingCapacity ?? "—"}</Value>
                        )}
                      </FormField>
                    )}
                  </FieldGrid>

                  {isHotelLike && (
                    <div style={{ marginTop: "1rem" }}>
                      <FormField label="Facilities" optional>
                        {editing ? (
                          <CheckboxGrid>
                            {FACILITY_OPTIONS.map((facility) => (
                              <Checkbox
                                key={facility}
                                label={facility}
                                checked={facilities.includes(facility)}
                                onChange={(event) => toggleArrayValue("facilities", facility, event.target.checked)}
                              />
                            ))}
                          </CheckboxGrid>
                        ) : (
                          <Value>{establishment.facilities.length > 0 ? establishment.facilities.join(", ") : "—"}</Value>
                        )}
                      </FormField>
                    </div>
                  )}

                  {isDiningLike && (
                    <div style={{ marginTop: "1rem" }}>
                      <FormField label="Service types" optional>
                        {editing ? (
                          <CheckboxGrid>
                            {SERVICE_TYPE_OPTIONS.map((service) => (
                              <Checkbox
                                key={service}
                                label={service}
                                checked={serviceTypes.includes(service)}
                                onChange={(event) => toggleArrayValue("serviceTypes", service, event.target.checked)}
                              />
                            ))}
                          </CheckboxGrid>
                        ) : (
                          <Value>{establishment.serviceTypes.length > 0 ? establishment.serviceTypes.join(", ") : "—"}</Value>
                        )}
                      </FormField>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Owner</CardTitle>
              </CardHeader>
              <CardContent>
                {establishment.owner ? (
                  <FieldGrid>
                    <FormField label="Full name">
                      <Value>{establishment.owner.fullName}</Value>
                    </FormField>
                    <FormField label="Email">
                      <Value>{establishment.owner.email}</Value>
                    </FormField>
                    <FormField label="Phone">
                      <Value>{establishment.owner.phoneNumber ?? "—"}</Value>
                    </FormField>
                  </FieldGrid>
                ) : (
                  <Muted>No owner account — this establishment was registered directly by an admin.</Muted>
                )}
              </CardContent>
            </Card>

            <div style={{ marginTop: "1.25rem" }}>
              <Card>
                <CardHeader>
                  <CardTitle>Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <FieldGrid>
                    <FormField label="Submitted">
                      <Value>{establishment.submittedAt ? new Date(establishment.submittedAt).toLocaleString() : "—"}</Value>
                    </FormField>
                    <FormField label="Approved">
                      <Value>{establishment.approvedAt ? new Date(establishment.approvedAt).toLocaleString() : "—"}</Value>
                    </FormField>
                  </FieldGrid>
                </CardContent>
              </Card>
            </div>
          </div>
        </Grid2>

        {editing && (
          <SaveBar>
            <Button type="submit" loading={isSaving}>
              <Save size={16} /> Save changes
            </Button>
          </SaveBar>
        )}
      </form>

      {/* A branch can never itself have branches, so this section only ever
          renders on a top-level establishment's own page. */}
      {!establishment.parent && establishment.branches && establishment.branches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Branches ({establishment.branches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {establishment.branches.map((branch) => (
              <BranchCardLink
                key={branch.id}
                type="button"
                onClick={() => navigate(`/hospitality-portal/entities/${branch.id}`)}
              >
                <BranchCard>
                  <strong>{branch.businessName ?? "Branch"}</strong>
                  {branch.uniqueBusinessId && <Muted>{branch.uniqueBusinessId}</Muted>}
                  <Muted>
                    {branch.address}, {branch.localGovernment}
                  </Muted>
                  <StatusBadge status={branch.registrationStatus} />
                </BranchCard>
              </BranchCardLink>
            ))}
          </CardContent>
        </Card>
      )}

      <ApproveDialog
        open={approveOpen}
        onOpenChange={setApproveOpen}
        businessName={establishment.businessName ?? "this establishment"}
        loading={isApproving}
        onConfirm={async () => {
          try {
            await approve(establishment.id);
            setApproveOpen(false);
          } catch {
            // The mutation hook already surfaces an error toast.
          }
        }}
      />
      <RejectDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        businessName={establishment.businessName ?? "this establishment"}
        loading={isRejecting}
        onSubmit={async (rejectionReason) => {
          try {
            await reject({ id: establishment.id, rejectionReason });
            setRejectOpen(false);
          } catch {
            // The mutation hook already surfaces an error toast.
          }
        }}
      />
    </div>
  );
};
