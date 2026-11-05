import { useQuiz } from '../context/QuizContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useQuiz();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="toast-container animate-fade-in-up">
      <div className={`toast-card ${toast.type}`}>
        <div className="toast-icon">
          {isSuccess && <CheckCircle2 size={18} className="text-emerald-400" />}
          {isError && <AlertCircle size={18} className="text-rose-400" />}
          {!isSuccess && !isError && <Info size={18} className="text-violet-400" />}
        </div>
        <div className="toast-message">{toast.message}</div>
      </div>
    </div>
  );
}
