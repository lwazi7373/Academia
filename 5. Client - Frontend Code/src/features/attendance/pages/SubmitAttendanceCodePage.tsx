// StudentSubmitCodePage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useMarkAttendance } from '../attendance.mutations';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export default function SubmitAttendanceCodePage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const markAttendanceMutation = useMarkAttendance();

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow alphanumeric characters
    const sanitized = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (sanitized.length === 0) {
      // Handle backspace
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      
      // Move to previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    // Take only the last character if pasting
    const char = sanitized.slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);

    // Move to next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (index === 5 && char) {
      const fullCode = [...newCode.slice(0, 5), char].join('');
      handleSubmit(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs.current[5]?.focus();
      
      // Auto-submit
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (attendanceCode?: string) => {
    const fullCode = attendanceCode || code.join('');
    
    if (fullCode.length !== 6) {
      return;
    }

    try {
      await markAttendanceMutation.mutateAsync({
        attendanceCode: fullCode,
      });

      // Success - could navigate to success page or dashboard
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
    } catch (error) {
      // Clear code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const isLoading = markAttendanceMutation.isPending;
  const isSuccess = markAttendanceMutation.isSuccess;
  const error = markAttendanceMutation.error;

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      return error.response?.data?.error || 'Invalid or expired code';
    }
    return 'Failed to mark attendance';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mark Attendance</h1>
          <p className="text-blue-100">Enter the 6-character code from your lecturer</p>
        </div>

        {/* Success State */}
        {isSuccess && (
          <div className="p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Attendance Marked!</h2>
            <p className="text-gray-600 mb-6">Your attendance has been successfully recorded.</p>
            <button
              onClick={() => navigate('/student/dashboard')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Return to Dashboard
            </button>
          </div>
        )}

        {/* Form State */}
        {!isSuccess && (
          <form onSubmit={handleManualSubmit} className="p-8">
            <div className="space-y-6">
              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">Invalid Code</h3>
                    <p className="text-sm text-red-700 mt-1">{getErrorMessage(error)}</p>
                  </div>
                </div>
              )}

              {/* Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter Attendance Code
                </label>
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isLoading}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed uppercase"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Code will auto-submit when complete
                </p>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Important</p>
                    <ul className="text-blue-700 space-y-1 list-disc list-inside">
                      <li>Codes expire after 5 minutes</li>
                      <li>Make sure you're in the correct class</li>
                      <li>Each code can only be used once</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Manual Submit Button */}
              <button
                type="submit"
                disabled={isLoading || code.join('').length !== 6}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Mark Attendance
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        {!isSuccess && (
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}