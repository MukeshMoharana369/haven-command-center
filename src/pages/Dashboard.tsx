
import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { useRoom } from '../context/RoomContext';
import { lightDevices, thermostatDevices, securityDevices, securityCameras } from '../utils/mockData';
import { LightControl } from '../components/devices/LightControl';
import { ThermostatControl } from '../components/devices/ThermostatControl';
import { SecurityCamera } from '../components/devices/SecurityCamera';
import { DoorSensor } from '../components/devices/DoorSensor';
import { DeviceCard } from '../components/devices/DeviceCard';
import { Home } from 'lucide-react';

export const Dashboard = () => {
  const { currentRoom } = useRoom();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentRoom.id]);

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DeviceCard title="Quick Stats" icon={<Home />}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Active Devices</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Lights On</span>
            <span className="font-medium">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Energy Usage</span>
            <span className="font-medium">2.4 kWh</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Security Status</span>
            <span className="text-green-500 font-medium">Secured</span>
          </div>
        </div>
      </DeviceCard>
      
      <SecurityCamera
        id={securityCameras['front-door'].id}
        name={securityCameras['front-door'].name}
        status={securityCameras['front-door'].status}
        imageUrl={securityCameras['front-door'].imageUrl}
      />
      
      {thermostatDevices['living-room'] && (
        <ThermostatControl
          id={thermostatDevices['living-room'].id}
          name={thermostatDevices['living-room'].name}
          currentTemp={thermostatDevices['living-room'].currentTemp}
          targetTemp={thermostatDevices['living-room'].targetTemp}
          mode={thermostatDevices['living-room'].mode as 'cool' | 'heat' | 'off'}
          humidity={thermostatDevices['living-room'].humidity}
        />
      )}
      
      <DoorSensor
        id={securityDevices['front-door'].id}
        name={securityDevices['front-door'].name}
        status={securityDevices['front-door'].status as 'locked' | 'unlocked' | 'opened' | 'closed'}
        lastActivity={securityDevices['front-door'].lastActivity}
      />
      
      {lightDevices['living-room'] && lightDevices['living-room'].length > 0 && (
        <LightControl
          id={lightDevices['living-room'][0].id}
          name={lightDevices['living-room'][0].name}
          isOn={lightDevices['living-room'][0].isOn}
          brightness={lightDevices['living-room'][0].brightness}
          color={lightDevices['living-room'][0].color}
        />
      )}
    </div>
  );

  const renderRoomDevices = () => {
    const roomLights = lightDevices[currentRoom.id as keyof typeof lightDevices] || [];
    const roomThermostat = thermostatDevices[currentRoom.id as keyof typeof thermostatDevices];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomLights.map((light) => (
          <LightControl
            key={light.id}
            id={light.id}
            name={light.name}
            isOn={light.isOn}
            brightness={light.brightness}
            color={light.color}
          />
        ))}
        
        {roomThermostat && (
          <ThermostatControl
            id={roomThermostat.id}
            name={roomThermostat.name}
            currentTemp={roomThermostat.currentTemp}
            targetTemp={roomThermostat.targetTemp}
            mode={roomThermostat.mode as 'cool' | 'heat' | 'off'}
            humidity={roomThermostat.humidity}
          />
        )}
        
        {currentRoom.id === 'living-room' && (
          <SecurityCamera
            id={securityCameras['front-door'].id}
            name={securityCameras['front-door'].name}
            status={securityCameras['front-door'].status}
            imageUrl={securityCameras['front-door'].imageUrl}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 animate-fade-in">
            <h2 className="text-3xl font-bold">{currentRoom.icon} {currentRoom.name}</h2>
            <p className="text-muted-foreground mt-1">
              {currentRoom.id === 'overview' 
                ? 'View and control all your home devices' 
                : `Control your ${currentRoom.name.toLowerCase()} devices`
              }
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted/20 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {currentRoom.id === 'overview' ? renderOverview() : renderRoomDevices()}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
