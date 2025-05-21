
// Room Data
export const rooms = [
  { id: 'living-room', name: 'Living Room', icon: '🛋️' },
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
  { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
  { id: 'office', name: 'Office', icon: '💻' },
  { id: 'garage', name: 'Garage', icon: '🚗' },
];

// Light Devices
export const lightDevices = {
  'living-room': [
    { id: 'lr-light-1', name: 'Ceiling Light', isOn: true, brightness: 80, color: '#FFFFFF' },
    { id: 'lr-light-2', name: 'Floor Lamp', isOn: false, brightness: 60, color: '#FFF4E0' },
    { id: 'lr-light-3', name: 'TV Backlight', isOn: true, brightness: 50, color: '#00A3FF' },
  ],
  'bedroom': [
    { id: 'br-light-1', name: 'Main Light', isOn: false, brightness: 70, color: '#FFFFFF' },
    { id: 'br-light-2', name: 'Bedside Lamp', isOn: true, brightness: 40, color: '#FFCEBB' },
  ],
  'kitchen': [
    { id: 'kt-light-1', name: 'Ceiling Lights', isOn: true, brightness: 100, color: '#FFFFFF' },
    { id: 'kt-light-2', name: 'Under Cabinet', isOn: true, brightness: 80, color: '#FFFFFF' },
  ],
  'bathroom': [
    { id: 'bt-light-1', name: 'Main Light', isOn: false, brightness: 90, color: '#FFFFFF' },
    { id: 'bt-light-2', name: 'Mirror Light', isOn: false, brightness: 100, color: '#FFFFFF' },
  ],
  'office': [
    { id: 'of-light-1', name: 'Ceiling Light', isOn: true, brightness: 90, color: '#FFFFFF' },
    { id: 'of-light-2', name: 'Desk Lamp', isOn: true, brightness: 70, color: '#F0F4FF' },
  ],
  'garage': [
    { id: 'gr-light-1', name: 'Overhead Light', isOn: false, brightness: 100, color: '#FFFFFF' },
  ],
};

// Thermostat Devices
export const thermostatDevices = {
  'living-room': { id: 'lr-thermo', name: 'Living Room', currentTemp: 72, targetTemp: 74, mode: 'cool', humidity: 45 },
  'bedroom': { id: 'br-thermo', name: 'Bedroom', currentTemp: 70, targetTemp: 72, mode: 'cool', humidity: 50 },
  'kitchen': { id: 'kt-thermo', name: 'Kitchen', currentTemp: 75, targetTemp: 74, mode: 'cool', humidity: 40 },
  'office': { id: 'of-thermo', name: 'Office', currentTemp: 74, targetTemp: 73, mode: 'cool', humidity: 38 },
};

// Security Devices
export const securityDevices = {
  'front-door': { id: 'sec-front-door', name: 'Front Door', status: 'locked', lastActivity: '2 min ago' },
  'back-door': { id: 'sec-back-door', name: 'Back Door', status: 'locked', lastActivity: '1 hour ago' },
  'garage-door': { id: 'sec-garage', name: 'Garage Door', status: 'closed', lastActivity: '3 hours ago' },
  'windows': [
    { id: 'win-lr-1', name: 'Living Room Window', status: 'closed', lastActivity: '6 hours ago' },
    { id: 'win-br-1', name: 'Bedroom Window', status: 'opened', lastActivity: '10 min ago' },
    { id: 'win-kt-1', name: 'Kitchen Window', status: 'closed', lastActivity: '1 day ago' },
  ],
};

// Security Cameras
export const securityCameras = {
  'front-door': { id: 'cam-front', name: 'Front Door', status: 'active', imageUrl: 'https://images.pexels.com/photos/712520/pexels-photo-712520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  'back-yard': { id: 'cam-back', name: 'Back Yard', status: 'active', imageUrl: 'https://images.pexels.com/photos/168486/pexels-photo-168486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  'driveway': { id: 'cam-drive', name: 'Driveway', status: 'active', imageUrl: 'https://images.pexels.com/photos/1416475/pexels-photo-1416475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
};

// Voice Commands
export const voiceCommands = [
  "Turn off living room lights",
  "Set thermostat to 72 degrees",
  "Lock the front door", 
  "Is the garage door closed?",
  "Make the bedroom cooler",
  "Turn on TV backlight",
  "Set kitchen lights to 50 percent",
  "Are any windows open?",
  "Show front door camera",
];

// Mock user data
export const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://i.pravatar.cc/150?img=37",
};
