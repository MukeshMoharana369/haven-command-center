
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Moon, Sun, Mic, LogOut } from 'lucide-react';
import { userData } from '../../utils/mockData';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VoiceCommand } from '../voice/VoiceCommand';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showVoiceCommand, setShowVoiceCommand] = React.useState(false);

  const handleNotificationClick = () => {
    toast({
      title: 'Notifications',
      description: 'You have no new notifications',
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    // In a real app, we would clear auth tokens/session here
    setTimeout(() => {
      navigate('/');
    }, 1500);
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userData.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {showVoiceCommand && <VoiceCommand onClose={() => setShowVoiceCommand(false)} />}
    </header>
  );
};
