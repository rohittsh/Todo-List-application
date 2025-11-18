import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../api/auth';
import { forgotPasswordSchema, type ForgotPasswordForm } from '../schemas/auth';

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const mutation = useMutation({
    mutationFn: forgotPasswordRequest,
  });

  const onSubmit = (values: ForgotPasswordForm) => mutation.mutate(values);

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Reset access</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Forgot your password?</h2>
        <p className="mt-1 text-sm text-slate-500">We&apos;ll create a temporary reset token for you.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Email address</label>
            <input
              {...register('email')}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="you@email.com"
              disabled={mutation.isLoading}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Sending link…' : 'Send reset link'}
          </button>
        </form>

        {mutation.isSuccess && (
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 text-sm text-emerald-700">
            {mutation.data.message}
            {mutation.data.token && (
              <p className="mt-2 text-xs text-emerald-600">
                Demo token: <code className="rounded bg-white px-2 py-0.5">{mutation.data.token}</code> (paste into the reset form)
              </p>
            )}
          </div>
        )}

        {mutation.isError && (
          <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Remembered your password?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}


