import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, UserPlus, Info } from "lucide-react";
import { PageHeader } from "@/shared/components";
import {
  Button,
  Card,
  CardContent,
  FormField,
  Input,
  PasswordInput,
  toast,
} from "@/shared/ui";
import { ApiError } from "@/shared/lib";
import { useCreateAdmin } from "../api";
import { createAdminSchema, type CreateAdminFormValues } from "../schemas/create-admin.schema";

const Notice = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.info.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.info.DEFAULT};
  font-size: 0.8125rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 28rem;
`;

export const CreateAdminPage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateAdmin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAdminFormValues>({ resolver: zodResolver(createAdminSchema) });

  const onSubmit = async (values: CreateAdminFormValues) => {
    try {
      const admin = await mutateAsync(values);
      toast.success(`Admin account created for ${admin.fullName}.`);
      reset();
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Could not create the admin account.");
    }
  };

  return (
    <div>
      <PageHeader
        title="Create Admin"
        subtitle="Grant another staff member access to this portal"
        action={
          <Button variant="outline" onClick={() => navigate("/account/admins")}>
            <ArrowLeft size={16} /> Back to admins
          </Button>
        }
      />

      <Notice>
        <Info size={18} />
        <span>
          Any admin account can access every domain of this portal — there are no separate per-domain
          permissions. Share the temporary password below with the new admin directly.
        </span>
      </Notice>

      <Card>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField label="Full name" required error={errors.fullName?.message}>
              <Input placeholder="Jane Doe" autoComplete="name" {...register("fullName")} />
            </FormField>
            <FormField label="Email address" required error={errors.email?.message}>
              <Input type="email" placeholder="jane@akhtdc.gov.ng" autoComplete="email" {...register("email")} />
            </FormField>
            <FormField
              label="Temporary password"
              required
              hint="At least 8 characters. Share this securely with the new admin."
              error={errors.password?.message}
            >
              <PasswordInput autoComplete="new-password" {...register("password")} />
            </FormField>
            <Button type="submit" loading={isPending}>
              <UserPlus size={16} />
              Create admin
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
