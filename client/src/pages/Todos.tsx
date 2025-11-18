import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../api/todos';
import { createTodoSchema, type CreateTodoForm, type Todo } from '../schemas/todo';
import useAuth from '../store/auth';

export default function Todos() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoForm>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: '', description: '' },
  });

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 30,
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Todo> }) => updateTodo(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const onSubmit = (data: CreateTodoForm) => {
    createMutation.mutate(data);
  };

  return (
    <div className="glass-panel mx-auto max-w-4xl p-8">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-500">Workspace</p>
          <h2 className="text-3xl font-semibold text-slate-900">Todos</h2>
          <p className="text-sm text-slate-500">Stay on top of your day, {user?.name ?? 'friend'}.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
          {todosQuery.data?.filter((todo) => !todo.completed).length ?? 0} open
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-600">Title</label>
            <input
              {...register('title')}
              placeholder="Add a short, actionable title"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              disabled={createMutation.isLoading}
            />
            {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>}
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-600">Description</label>
            <input
              {...register('description')}
              placeholder="Optional context"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              disabled={createMutation.isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:opacity-50"
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? 'Adding…' : 'Add todo'}
        </button>
        {createMutation.isError && <p className="mt-2 text-xs text-rose-500">Could not add todo. Please try again.</p>}
      </form>

      <section className="mt-8 space-y-4">
        {todosQuery.isLoading && (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-20 rounded-2xl bg-slate-100" />
            ))}
          </div>
        )}

        {todosQuery.isError && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 text-sm text-rose-600">
            Unable to load todos. Please refresh or try again later.
          </div>
        )}

        {todosQuery.data?.length === 0 && !todosQuery.isLoading && (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center text-slate-500">
            No todos yet. Start by adding your first task above ✨
          </div>
        )}

        {todosQuery.data?.map((todo) => (
          <article
            key={todo._id}
            className={`flex flex-col gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 md:flex-row md:items-center ${
              todo.completed ? 'border-emerald-100 bg-emerald-50/60' : 'border-slate-100 bg-white'
            }`}
          >
            <div className="flex-1">
              <p className={`text-base font-semibold ${todo.completed ? 'text-emerald-700 line-through' : 'text-slate-900'}`}>{todo.title}</p>
              {todo.description && <p className="text-sm text-slate-500">{todo.description}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateMutation.mutate({ id: todo._id, payload: { completed: !todo.completed } })}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  todo.completed
                    ? 'border border-slate-200 text-slate-600 hover:border-slate-300'
                    : 'bg-emerald-500 text-white hover:bg-emerald-400'
                }`}
                disabled={updateMutation.isLoading}
              >
                {todo.completed ? 'Mark as active' : 'Mark complete'}
              </button>
              <button
                onClick={() => deleteMutation.mutate(todo._id)}
                className="rounded-full border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
                disabled={deleteMutation.isLoading}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
