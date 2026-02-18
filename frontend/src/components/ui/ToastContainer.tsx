'use client';

import { useToast } from '@/context/ToastContext';
import { Toast } from './Toast';

export function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      ))}
    </div>
  );
}
