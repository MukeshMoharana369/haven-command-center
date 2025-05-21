
import { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { Video, VideoOff, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';

interface SecurityCameraProps {
  id: string;
  name: string;
  status: string;
  imageUrl: string;
}

export const SecurityCamera = ({ id, name, status: initialStatus, imageUrl }: SecurityCameraProps) => {
  const [active, setActive] = useState(initialStatus === 'active');
  const [fullscreen, setFullscreen] = useState(false);
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    setActive(checked);
    toast({
      title: `Camera ${checked ? 'activated' : 'deactivated'}`,
      description: `${name} camera is now ${checked ? 'active' : 'inactive'}`,
      duration: 1500,
    });
  };

  return (
    <DeviceCard 
      title={name} 
      icon={active ? <Video /> : <VideoOff />}
      className={`h-full ${fullscreen ? 'col-span-2 row-span-2 z-10' : ''}`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className={`mr-2 h-2 w-2 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm">{active ? 'Live' : 'Inactive'}</span>
          </div>
          <Switch checked={active} onCheckedChange={handleToggle} />
        </div>
        
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border border-white/10">
          <img
            src={imageUrl}
            alt={`${name} camera feed`}
            className={`object-cover transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-50 grayscale'}`}
          />
        </AspectRatio>
        
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFullscreen(!fullscreen)}
            disabled={!active}
          >
            {fullscreen ? 'Minimize' : 'Expand'}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            disabled={!active}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DeviceCard>
  );
};
