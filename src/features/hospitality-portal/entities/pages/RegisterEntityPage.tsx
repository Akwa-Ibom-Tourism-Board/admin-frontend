import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Building2, Plus, RotateCcw, Send } from "lucide-react";
import { PageHeader, ConfirmModal, EmptyState } from "@/shared/components";
import { Button } from "@/shared/ui";
import { useConfirm } from "@/shared/hooks";
import { ApiError } from "@/shared/lib";
import { ENTITY_TYPES } from "@/shared/content";
import { EstablishmentForm } from "../components/EstablishmentForm";
import { useBulkAddEstablishments } from "../api";
import {
  bulkEstablishmentsSchema,
  createEmptyEstablishment,
  type BulkEstablishmentsFormValues,
} from "../schemas/establishment.schema";
import type { BulkAddError, BulkAddPayload } from "../types";

const STORAGE_KEY = "bulk_entity_registrations";
const MAX_ROWS = 500;

const RowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

const ActionsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: center;
`;

const Summary = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const emptyDraft = (): BulkEstablishmentsFormValues => ({ establishments: [] });

export const RegisterEntityPage = () => {
  const navigate = useNavigate();
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});
  const hasLoadedDraft = useRef(false);

  const { state: confirmState, ask: askConfirm, close: closeConfirm } = useConfirm();
  const { mutateAsync: bulkAdd, isPending } = useBulkAddEstablishments();

  const methods = useForm<BulkEstablishmentsFormValues>({
    resolver: zodResolver(bulkEstablishmentsSchema),
    defaultValues: emptyDraft(),
    mode: "onBlur",
  });
  const { control, handleSubmit, watch, reset } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "establishments" });

  // Restore an in-progress draft on mount; otherwise start with one row so
  // the page isn't a blank form.
  useEffect(() => {
    if (hasLoadedDraft.current) return;
    hasLoadedDraft.current = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as BulkEstablishmentsFormValues;
        if (parsed && Array.isArray(parsed.establishments) && parsed.establishments.length > 0) {
          reset(parsed);
          return;
        }
      }
    } catch {
      // Corrupted draft — ignore and start fresh.
    }
    append(createEmptyEstablishment(ENTITY_TYPES[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  // Autosave the draft on every change.
  useEffect(() => {
    const subscription = watch((value) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        // Storage full/unavailable — silently skip autosave.
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleClearAll = () => {
    askConfirm({
      title: "Clear all businesses",
      message: "This removes every business row you've entered in this batch. This can't be undone.",
      confirmLabel: "Clear all",
      variant: "destructive",
      onConfirm: () => {
        reset(emptyDraft());
        setRowErrors({});
        window.localStorage.removeItem(STORAGE_KEY);
      },
    });
  };

  const onSubmit = async (values: BulkEstablishmentsFormValues) => {
    setRowErrors({});
    const fieldIdsAtSubmit = fields.map((field) => field.id);

    const payload: BulkAddPayload = {
      establishments: values.establishments.map((establishment) => {
        const { branches, website, hasWebsite, ...rest } = establishment;
        return {
          ...rest,
          hasWebsite,
          website: hasWebsite ? website : undefined,
          branches: branches && branches.length > 0 ? branches : undefined,
        };
      }),
    };

    const applyRowErrors = (errors: BulkAddError[]) => {
      const byFieldId: Record<string, string> = {};
      errors.forEach((error) => {
        const fieldId = fieldIdsAtSubmit[error.index];
        if (fieldId) byFieldId[fieldId] = error.error;
      });
      setRowErrors(byFieldId);
    };

    try {
      const result = await bulkAdd(payload);

      if (result.failed > 0 && result.errors) {
        applyRowErrors(result.errors);
        const failedIndexes = new Set(result.errors.map((error) => error.index));
        const succeededIndexes = values.establishments
          .map((_, index) => index)
          .filter((index) => !failedIndexes.has(index));
        if (succeededIndexes.length > 0) {
          remove(succeededIndexes);
        }
        return;
      }

      window.localStorage.removeItem(STORAGE_KEY);
      reset(emptyDraft());
      navigate("/hospitality-portal/entities");
    } catch (error) {
      if (error instanceof ApiError) {
        const errors = (error.details as { data?: { errors?: BulkAddError[] } } | undefined)?.data?.errors;
        if (errors && errors.length > 0) {
          applyRowErrors(errors);
        }
      }
    }
  };

  return (
    <div>
      <PageHeader
        title="Register Entity"
        subtitle="Register one or more hospitality establishments at once, of any mix of types. Your progress is saved automatically."
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No businesses in this batch yet"
              message="Add a business to get started."
              action={{
                label: "Add a business",
                onClick: () => append(createEmptyEstablishment(ENTITY_TYPES[0])),
              }}
            />
          ) : (
            <>
              <RowList>
                {fields.map((field, index) => (
                  <EstablishmentForm
                    key={field.id}
                    index={index}
                    canRemove={fields.length > 1}
                    disabled={isPending}
                    onRemove={() => remove(index)}
                    submissionError={rowErrors[field.id]}
                  />
                ))}
              </RowList>

              <ActionsBar>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending || fields.length >= MAX_ROWS}
                  onClick={() => append(createEmptyEstablishment(ENTITY_TYPES[0]))}
                >
                  <Plus size={16} /> Add another business
                </Button>

                <Summary>
                  {fields.length} {fields.length === 1 ? "business" : "businesses"} ready for registration
                </Summary>

                <ButtonGroup>
                  <Button type="button" variant="ghost" disabled={isPending} onClick={handleClearAll}>
                    <RotateCcw size={16} /> Clear all
                  </Button>
                  <Button type="submit" loading={isPending}>
                    <Send size={16} /> Submit {fields.length > 1 ? `all (${fields.length})` : ""}
                  </Button>
                </ButtonGroup>
              </ActionsBar>
            </>
          )}
        </form>
      </FormProvider>

      <ConfirmModal state={confirmState} onClose={closeConfirm} />
    </div>
  );
};
