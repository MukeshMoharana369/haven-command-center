
import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceControlEnabled, setVoiceControlEnabled] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 animate-fade-in">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <SettingsIcon size={28} /> Settings
            </h2>
            <p className="text-muted-foreground mt-1">
              Configure your SmartHaven preferences
            </p>
          </div>
          
          <div className="grid max-w-4xl gap-6">
            <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme-toggle" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                </div>
                <Switch 
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications-toggle" className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable alert notifications from your devices</p>
                </div>
                <Switch 
                  id="notifications-toggle"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Voice Control</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voice-toggle" className="font-medium">Voice Assistant</Label>
                  <p className="text-sm text-muted-foreground">Control your home with voice commands</p>
                </div>
                <Switch 
                  id="voice-toggle"
                  checked={voiceControlEnabled}
                  onCheckedChange={setVoiceControlEnabled}
                />
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Account</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full sm:w-auto">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">
                  Update Profile
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
