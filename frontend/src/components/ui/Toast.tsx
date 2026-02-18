'use client';

import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';

interface ToastItemProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: (id: string) => void;
}

export function Toast({
  id,
  message,
  type,
  onClose,
}: ToastItemProps) {
  const toastConfig: Record<
    string,
    { Icon: any; classes: string }
  > = {
    success: {
      Icon: CheckCircle,
      classes: 'bg-green-50 border-green-200 text-green-800',
    },
    error: {
      Icon: XCircle,
      classes: 'bg-red-50 border-red-200 text-red-800',
    },
    warning: {
      Icon: AlertTriangle,
      classes: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    },
    info: {
      Icon: Info,
      classes: 'bg-blue-50 border-blue-200 text-blue-800',
    },
  };

  const { Icon, classes } = toastConfig[type];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[400px] ${classes}`}
    >
      <Icon size={20} className="flex-shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-75 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}
