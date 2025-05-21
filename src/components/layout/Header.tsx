
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Moon, Sun, Mic } from 'lucide-react';
import { userData } from '../../utils/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VoiceCommand } from '../voice/VoiceCommand';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showVoiceCommand, setShowVoiceCommand] = React.useState(false);

  const handleNotificationClick = () => {
    toast({
      title: 'Notifications',
      description: 'You have no new notifications',
    });
  };

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-border animate-fade-in">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gradient">SmartHaven</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setShowVoiceCommand(true)}
          className="rounded-full"
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleNotificationClick} 
          className="rounded-full"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme} 
          className="rounded-full"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {showVoiceCommand && <VoiceCommand onClose={() => setShowVoiceCommand(false)} />}
    </header>
  );
};
