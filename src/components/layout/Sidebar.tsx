
import { useState } from 'react';
import { useRoom } from '../../context/RoomContext';
import { rooms } from '../../utils/mockData';
import { Home, ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentRoom, setCurrentRoom } = useRoom();
  const navigate = useNavigate();

  return (
    <aside 
      className={cn(
        "h-screen min-h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-sidebar-border">
        {!collapsed && <h2 className="text-xl font-semibold">Rooms</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Button
          variant={currentRoom.id === 'overview' ? "secondary" : "ghost"}
          className={cn(
            "flex items-center justify-start gap-3 p-4 mb-2", 
            collapsed && "justify-center"
          )}
          onClick={() => {
            setCurrentRoom({ id: 'overview', name: 'Overview', icon: '🏠' });
            navigate('/dashboard');
          }}
        >
          <Home size={20} />
          {!collapsed && <span>Overview</span>}
        </Button>
        
        <div className="px-4">
          {!collapsed && <div className="text-sm text-muted-foreground mb-2">Rooms</div>}
          <div className="space-y-1">
            {rooms.map((room) => (
              <Button
                key={room.id}
                variant={currentRoom.id === room.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full flex items-center justify-start gap-3", 
                  collapsed && "justify-center"
                )}
                onClick={() => {
                  setCurrentRoom(room);
                  navigate('/dashboard');
                }}
              >
                <span className="text-lg">{room.icon}</span>
                {!collapsed && <span>{room.name}</span>}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center justify-start gap-3", 
            collapsed && "justify-center"
          )}
          onClick={() => navigate('/settings')}
        >
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </aside>
  );
};
