import { BookOpen, GraduationCap, Building } from 'lucide-react';
import { useModule } from '../context/ModuleContext';

export default function ModuleDetailComponent() {
  const { module, isLoading } = useModule();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!module) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 mb-6 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={28} />
            <h1 className="text-2xl font-bold">{module.moduleCode}</h1>
          </div>
          <p className="text-lg text-blue-100 mb-4">{module.moduleName}</p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <GraduationCap size={16} />
              <span>{module.credits} Credits</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <Building size={16} />
              <span>{module.departmentName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}