// LecturerCreateSessionPage.tsx
import React, { useState } from 'react';
import { Clock, BookOpen, Users, Play, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateClassSession } from '../attendance.mutations';
import { AxiosError } from 'axios';

export default function GenerateAttendanceCodePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [classType, setClassType] = useState('');

  const createSessionMutation = useCreateClassSession(Number(moduleId));

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createSessionMutation.mutateAsync({
        classType,
      });

      // Navigate to view code page
      navigate(`/lecturer/modules/${moduleId}/attendance/view`, {
        state: { session: result.createdSession },
      });
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const isLoading = createSessionMutation.isPending;
  const error = createSessionMutation.error;

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      return error.response?.data?.error || 'Failed to create session';
    }
    return 'An unexpected error occurred';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Start Attendance</h1>
          <p className="text-blue-100">Generate a new attendance code</p>
        </div>

        {/* Module Info */}
        <div className="px-8 py-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Module</div>
              <div className="font-medium text-gray-800">Module {moduleId}</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateSession} className="p-8">
          <div className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Failed to Create Session</h3>
                  <p className="text-sm text-red-700 mt-1">{getErrorMessage(error)}</p>
                </div>
              </div>
            )}

            {/* Class Type Selection */}
            <div>
              <label htmlFor="classType" className="block text-sm font-medium text-gray-700 mb-3">
                Select Class Type *
              </label>
              <div className="space-y-3">
                {['Lecture', 'Tutorial', 'Practical', 'Lab'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      classType === type
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="classType"
                      value={type}
                      checked={classType === type}
                      onChange={(e) => setClassType(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <span className="ml-3 font-medium text-gray-800">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Session Duration</p>
                  <p className="text-blue-700">
                    The attendance code will be valid for 5 minutes. Students must submit the code within this time.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !classType}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Session...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Start Attendance Session
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Back to Module
          </button>
        </div>
      </div>
    </div>
  );
}