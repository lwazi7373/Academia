// LecturerViewCodePage.tsx
import { useState, useEffect } from 'react';
import { Clock, Copy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetActiveSession } from '../attendance.queries';
import { toast } from 'react-hot-toast';

export default function AttendanceCodePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
 //const location = useLocation();
  
  const { data: activeSessionData, isLoading, refetch } = useGetActiveSession(Number(moduleId));
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const session = activeSessionData?.activeSession;

  // Calculate time remaining
  useEffect(() => {
    if (!session?.expiresAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(session.expiresAt).getTime();
      const remaining = Math.max(0, expiry - now);
      
      setTimeRemaining(remaining);

      // If expired, could auto-navigate or show option to create new session
      if (remaining === 0) {
        toast.error('Attendance session has expired');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [session]);

  // Format time as MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Copy code to clipboard
  const handleCopyCode = async () => {
    if (!session?.attendanceCode) return;

    try {
      await navigator.clipboard.writeText(session.attendanceCode);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (!session?.expiresAt) return 0;
    const total = 5 * 60 * 1000; // 5 minutes in ms
    return Math.max(0, Math.min(100, (timeRemaining / total) * 100));
  };

  const isExpired = timeRemaining === 0;
  const isAlmostExpired = timeRemaining < 60000 && timeRemaining > 0; // Less than 1 minute

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Active Session</h2>
          <p className="text-gray-600 mb-6">There is no active attendance session for this module.</p>
          <button
            onClick={() => navigate(`/lecturer/modules/${moduleId}/attendance/create`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create New Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Attendance Code</h1>
          <p className="text-blue-100">{session.classType} Session</p>
        </div>

        {/* Countdown Timer */}
        <div className={`px-8 py-6 text-center border-b ${
          isExpired 
            ? 'bg-red-50 border-red-200' 
            : isAlmostExpired 
            ? 'bg-yellow-50 border-yellow-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock size={24} className={
              isExpired 
                ? 'text-red-600' 
                : isAlmostExpired 
                ? 'text-yellow-600' 
                : 'text-blue-600'
            } />
            <span className={`text-3xl font-bold ${
              isExpired 
                ? 'text-red-600' 
                : isAlmostExpired 
                ? 'text-yellow-600' 
                : 'text-blue-600'
            }`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <p className={`text-sm font-medium ${
            isExpired 
              ? 'text-red-700' 
              : isAlmostExpired 
              ? 'text-yellow-700' 
              : 'text-blue-700'
          }`}>
            {isExpired ? 'Session Expired' : isAlmostExpired ? 'Expiring Soon!' : 'Time Remaining'}
          </p>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                isExpired 
                  ? 'bg-red-600' 
                  : isAlmostExpired 
                  ? 'bg-yellow-600' 
                  : 'bg-blue-600'
              }`}
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Attendance Code Display */}
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-3">Students must enter this code:</p>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 mb-4 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
                }}></div>
              </div>
              
              {/* Code */}
              <div className="relative">
                <div className="text-6xl font-bold text-white tracking-widest mb-2 font-mono">
                  {session.attendanceCode}
                </div>
                {isExpired && (
                  <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center rounded-xl">
                    <span className="text-white font-bold text-xl">EXPIRED</span>
                  </div>
                )}
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyCode}
              disabled={isExpired}
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? (
                <>
                  <CheckCircle size={20} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Copy Code
                </>
              )}
            </button>
          </div>

          {/* Session Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Session Started:</span>
              <span className="font-medium text-gray-800">
                {new Date(session.sessionDate).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expires At:</span>
              <span className="font-medium text-gray-800">
                {new Date(session.expiresAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            {isExpired ? (
              <button
                onClick={() => navigate(`/lecturer/modules/${moduleId}/attendance/create`)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Create New Session
              </button>
            ) : (
              <button
                onClick={() => refetch()}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                Refresh Status
              </button>
            )}
            
            <button
              onClick={() => navigate(`/lecturer/modules/${moduleId}`)}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back to Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}