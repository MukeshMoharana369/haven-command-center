
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DeviceCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const DeviceCard = ({ title, icon, children, className }: DeviceCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl overflow-hidden animate-fade-in",
      className
    )}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium text-lg flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
