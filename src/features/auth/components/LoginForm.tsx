import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { Button, FormField, Input, PasswordInput, toast } from "@/shared/ui";
import { ApiError } from "@/shared/lib";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    try {
      await login(values);
      toast.success("Login successful. Redirecting…");
      navigate("/hospitality-portal", { replace: true });
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Unable to log in, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField label="Email address" required error={errors.email?.message}>
        <Input type="email" placeholder="you@akhtdc.gov.ng" autoComplete="email" {...register("email")} />
      </FormField>
      <FormField label="Password" required error={errors.password?.message}>
        <PasswordInput placeholder="••••••••" autoComplete="current-password" {...register("password")} />
      </FormField>
      <Button type="submit" size="lg" fullWidth loading={submitting}>
        Sign in
      </Button>
    </Form>
  );
};
