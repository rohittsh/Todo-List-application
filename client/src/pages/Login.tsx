import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth';
import { loginSchema, type LoginForm } from '../schemas/auth';
import useAuth from '../store/auth';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate('/todos');
    },
  });

  const onSubmit = (values: LoginForm) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="glass-panel p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Log into your workspace</h2>
        <p className="mt-1 text-sm text-slate-500">Track todos from anywhere. No friction, just focus.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Email address</label>
            <input
              {...register('email')}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="you@email.com"
              disabled={loginMutation.isLoading}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </div>
            <input
              {...register('password')}
              type="password"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="••••••••"
              disabled={loginMutation.isLoading}
            />
            {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {loginMutation.isError && (
          <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50/80 px-3 py-2 text-sm text-rose-600">
            Unable to sign in. Double-check your credentials and try again.
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
