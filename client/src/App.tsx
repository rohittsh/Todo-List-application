import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Todos from './pages/Todos';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import useAuth from './store/auth';

export default function App() {
  const { user, logout } = useAuth();
  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-purple-100"></div>
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            IntelliSQR Todo
          </Link>
          <nav className="flex items-center gap-3 text-sm font-medium">
            {user ? (
              <>
                <span className="hidden text-slate-500 sm:inline-flex">Hi, {user?.name || 'there'}!</span>
                <button
                  onClick={() => logout()}
                  className="rounded-full border border-transparent bg-slate-900 px-4 py-2 text-white transition hover:bg-indigo-600"
                >
                  Logout
                </button>
                <Link
                  to="/todos"
                  className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600"
                >
                  My Todos
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 transition hover:text-indigo-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<Landing isAuthenticated={!!user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/todos" element={user ? <Todos /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Landing({ isAuthenticated }: { isAuthenticated: boolean }) {
  const cards = [
    { title: 'Stay organized', copy: 'Group personal and work todos. Capture inspiration instantly.' },
    { title: 'Move faster', copy: 'One-click complete, quick edit, and blazing fast updates powered by React Query.' },
    { title: 'Sync anywhere', copy: 'Your data lives securely on the IntelliSQR API so you can switch devices freely.' },
  ];
  return (
    <section className="space-y-10">
      <div className="glass-panel relative overflow-hidden p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <p className="mb-4 inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Productivity Hub
        </p>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
          Build momentum with a calmer, smarter todo workspace.
        </h1>
        <p className="mt-4 text-lg text-slate-600 sm:max-w-2xl">
          Capture tasks, mark progress, and celebrate small wins with a design that keeps you inspired throughout the day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to={isAuthenticated ? '/todos' : '/signup'}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            {isAuthenticated ? 'Open my workspace' : 'Create free account'}
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600"
            >
              I already have an account
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="glass-panel h-full p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">{card.title}</p>
            <p className="mt-2 text-sm text-slate-600">{card.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
