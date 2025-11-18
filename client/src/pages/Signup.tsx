import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { signupRequest } from '../api/auth';
import { signupSchema, type SignupForm } from '../schemas/auth';
import useAuth from '../store/auth';

export default function Signup() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const signupMutation = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/todos');
    },
  });

  const onSubmit = (values: SignupForm) => {
    signupMutation.mutate(values);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass-panel p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Get organized</p>
        <h2 className="mt-2 text-4xl font-bold text-slate-900">Create your IntelliSQR account</h2>
        <p className="mt-1 text-sm text-slate-500">Plan your day, share progress, and celebrate your wins.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-600">Name</label>
            <input
              {...register('name')}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Alex Productivity"
              disabled={signupMutation.isLoading}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email address</label>
            <input
              {...register('email')}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="you@email.com"
              disabled={signupMutation.isLoading}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="••••••••"
              disabled={signupMutation.isLoading}
            />
            {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:opacity-50"
            disabled={signupMutation.isLoading}
          >
            {signupMutation.isLoading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        {signupMutation.isError && (
          <p className="mt-5 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already using IntelliSQR?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
