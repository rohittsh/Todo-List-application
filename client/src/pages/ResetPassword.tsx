import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordRequest } from '../api/auth';
import { resetPasswordSchema, type ResetPasswordForm } from '../schemas/auth';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultToken = params.get('token') ?? '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: defaultToken, password: '' },
  });

  useEffect(() => {
    if (defaultToken) setValue('token', defaultToken);
  }, [defaultToken, setValue]);

  const mutation = useMutation({
    mutationFn: resetPasswordRequest,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });

  const onSubmit = (values: ResetPasswordForm) => mutation.mutate(values);

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Secure your account</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Reset your password</h2>
        <p className="mt-1 text-sm text-slate-500">Paste the token you received via email (or the demo token).</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Reset token</label>
            <input
              {...register('token')}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Token from email"
              disabled={mutation.isLoading}
            />
            {errors.token && <p className="mt-1 text-xs text-rose-500">{errors.token.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">New password</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="••••••••"
              disabled={mutation.isLoading}
            />
            {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:opacity-50"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Resetting…' : 'Reset password'}
          </button>
        </form>

        {mutation.isError && (
          <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
            Could not reset your password. Verify your token and try again.
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


