
import React, { createContext, useContext, useState } from 'react';
import { rooms } from '../utils/mockData';

export type RoomType = {
  id: string;
  name: string;
  icon: string;
};

interface RoomContextType {
  rooms: RoomType[];
  currentRoom: RoomType;
  setCurrentRoom: (room: RoomType) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<RoomType>(rooms[0]);

  return (
    <RoomContext.Provider value={{ rooms, currentRoom, setCurrentRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};
