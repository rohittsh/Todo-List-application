import API from './apiClient';
import {
  authResponseSchema,
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  type ForgotPasswordForm,
  type LoginForm,
  type ResetPasswordForm,
  type SignupForm,
} from '../schemas/auth';

export const signupRequest = async (payload: SignupForm) => {
  const body = signupSchema.parse(payload);
  const res = await API.post('/auth/signup', body);
  return authResponseSchema.parse(res.data);
};

export const loginRequest = async (payload: LoginForm) => {
  const body = loginSchema.parse(payload);
  const res = await API.post('/auth/login', body);
  return authResponseSchema.parse(res.data);
};

export const forgotPasswordRequest = async (payload: ForgotPasswordForm) => {
  const body = forgotPasswordSchema.parse(payload);
  const res = await API.post('/auth/forgot', body);
  return res.data as { message: string; token?: string };
};

export const resetPasswordRequest = async (payload: ResetPasswordForm) => {
  const body = resetPasswordSchema.parse(payload);
  const res = await API.post('/auth/reset', body);
  return res.data as { message: string };
};


