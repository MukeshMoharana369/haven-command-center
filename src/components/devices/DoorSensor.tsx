
import { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { DoorClosed, DoorOpen, Lock, LockOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DoorSensorProps {
  id: string;
  name: string;
  status: 'locked' | 'unlocked' | 'opened' | 'closed';
  lastActivity: string;
}

export const DoorSensor = ({ id, name, status: initialStatus, lastActivity }: DoorSensorProps) => {
  const [status, setStatus] = useState(initialStatus);
  const { toast } = useToast();
  
  const isLocked = status === 'locked';
  const isClosed = status === 'closed' || status === 'locked';
  
  const handleToggleLock = () => {
    const newStatus = isLocked ? 'unlocked' : 'locked';
    setStatus(newStatus);
    
    toast({
      title: `${name} ${newStatus}`,
      description: `Door was ${newStatus} successfully`,
      duration: 1500,
    });
  };
  
  const getStatusIcon = () => {
    if (isClosed) {
      return isLocked ? <Lock className="text-green-500" /> : <DoorClosed />;
    } else {
      return <DoorOpen className="text-red-500" />;
    }
  };

  return (
    <DeviceCard 
      title={name} 
      icon={getStatusIcon()}
      className="h-full"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center py-4">
          <div className={`text-5xl transition-transform duration-500 ${isClosed ? '' : 'rotate-45'}`}>
            {isClosed ? '🚪' : '🚪'}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Status</span>
            <span className={`text-sm font-medium ${
              isLocked ? 'text-green-500' : 
              isClosed ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Last activity</span>
            <span className="text-sm text-muted-foreground">{lastActivity}</span>
          </div>
        </div>
        
        <Button 
          variant={isLocked ? "outline" : "default"}
          className="w-full"
          onClick={handleToggleLock}
          disabled={!isClosed}
        >
          {isLocked ? (
            <>
              <LockOpen className="mr-2 h-4 w-4" /> Unlock
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" /> Lock
            </>
          )}
        </Button>
      </div>
    </DeviceCard>
  );
};
