
import { useState } from 'react';
import { DeviceCard } from './DeviceCard';
import { Thermometer, ArrowDown, ArrowUp, Cloud, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface ThermostatProps {
  id: string;
  name: string;
  currentTemp: number;
  targetTemp: number;
  mode: 'heat' | 'cool' | 'off';
  humidity: number;
}

export const ThermostatControl = ({ 
  id, 
  name, 
  currentTemp: initialCurrent, 
  targetTemp: initialTarget,
  mode: initialMode,
  humidity 
}: ThermostatProps) => {
  const [currentTemp] = useState(initialCurrent);
  const [targetTemp, setTargetTemp] = useState(initialTarget);
  const [mode, setMode] = useState(initialMode);
  const { toast } = useToast();

  const handleTemperatureChange = (increment: boolean) => {
    const newTemp = increment ? targetTemp + 1 : targetTemp - 1;
    setTargetTemp(newTemp);
    
    toast({
      title: `Temperature ${increment ? 'increased' : 'decreased'}`,
      description: `Target temperature set to ${newTemp}°F`,
      duration: 1500,
    });
  };

  const handleModeChange = (newMode: 'heat' | 'cool' | 'off') => {
    setMode(newMode);
    
    toast({
      title: 'Thermostat Mode Changed',
      description: `Mode set to ${newMode}`,
      duration: 1500,
    });
  };

  const getModeColor = () => {
    switch(mode) {
      case 'heat': return 'text-orange-500';
      case 'cool': return 'text-blue-500';
      default: return '';
    }
  };

  return (
    <DeviceCard 
      title={`${name} Thermostat`} 
      icon={<Thermometer className={getModeColor()} />}
      className="h-full"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="text-4xl font-semibold pb-1">
            {targetTemp}°F
          </div>
          <div className="text-sm text-muted-foreground">
            Currently: {currentTemp}°F
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleTemperatureChange(false)}
            className="rounded-full"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleTemperatureChange(true)}
            className="rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Humidity</span>
            <span>{humidity}%</span>
          </div>
          <Progress value={humidity} className="h-2" />
        </div>
        
        <div className="flex justify-between gap-2 pt-2">
          <Button 
            variant={mode === 'cool' ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleModeChange('cool')}
            className="flex-1"
          >
            <Cloud className="h-4 w-4 mr-1" /> Cool
          </Button>
          <Button 
            variant={mode === 'heat' ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleModeChange('heat')}
            className="flex-1"
          >
            <Sun className="h-4 w-4 mr-1" /> Heat
          </Button>
          <Button 
            variant={mode === 'off' ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleModeChange('off')}
            className="flex-1"
          >
            Off
          </Button>
        </div>
      </div>
    </DeviceCard>
  );
};
