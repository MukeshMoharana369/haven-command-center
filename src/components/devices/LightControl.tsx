
import { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { Lightbulb, LightbulbOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface LightProps {
  id: string;
  name: string;
  isOn: boolean;
  brightness: number;
  color: string;
}

export const LightControl = ({ id, name, isOn: initialIsOn, brightness: initialBrightness, color }: LightProps) => {
  const [isOn, setIsOn] = useState(initialIsOn);
  const [brightness, setBrightness] = useState(initialBrightness);
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    setIsOn(checked);
    toast({
      title: `${name} turned ${checked ? 'on' : 'off'}`,
      duration: 1500,
    });
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
    toast({
      title: `${name} brightness`,
      description: `Set to ${value[0]}%`,
      duration: 1500,
    });
  };

  return (
    <DeviceCard 
      title={name} 
      icon={isOn ? <Lightbulb className="text-yellow-400" /> : <LightbulbOff />}
      className="h-full"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm">Status</span>
          <Switch checked={isOn} onCheckedChange={handleToggle} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Brightness</span>
            <span>{brightness}%</span>
          </div>
          <Slider
            disabled={!isOn}
            value={[brightness]}
            min={1}
            max={100}
            step={1}
            onValueChange={handleBrightnessChange}
            className={isOn ? "opacity-100" : "opacity-50"}
          />
        </div>

        <div 
          className="w-full h-6 rounded-md relative overflow-hidden transition-all duration-300"
          style={{ 
            backgroundColor: isOn ? color : '#2A2A2A',
            opacity: isOn ? brightness / 100 : 0.2
          }}
        />
      </div>
    </DeviceCard>
  );
};
