
import { useState, useEffect, useRef } from 'react';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { voiceCommands } from '../../utils/mockData';

interface VoiceCommandProps {
  onClose: () => void;
}

export const VoiceCommand = ({ onClose }: VoiceCommandProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [processingCommand, setProcessingCommand] = useState(false);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element for feedback
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Play audio feedback
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    // Simulate voice recognition with random voice commands
    setTimeout(() => {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setTranscript(randomCommand);
      processCommand(randomCommand);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processCommand = (command: string) => {
    setProcessingCommand(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Process command logic would go here in a real app
      setProcessingCommand(false);
      
      toast({
        title: 'Voice Command Processed',
        description: `"${command}" - Command executed successfully`,
      });
      
      onClose();
    }, 1000);
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md glass-card">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="text-xl font-medium">Voice Command</div>
          
          <div className="relative">
            <div 
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                isListening ? 'bg-primary/20' : 'bg-muted'
              }`}
            >
              <div 
                className={`absolute inset-0 rounded-full ${
                  isListening ? 'animate-pulse-glow bg-primary/10' : ''
                }`}
              />
              <div 
                className={`absolute inset-4 rounded-full ${
                  isListening ? 'animate-pulse-glow bg-primary/20 delay-75' : ''
                }`}
              />
              <Mic 
                className={`h-10 w-10 z-10 ${
                  isListening ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
            </div>
          </div>
          
          <div className="w-full text-center min-h-[60px] py-2">
            {transcript ? (
              <p className="text-xl animate-fade-in">"{transcript}"</p>
            ) : (
              <p className="text-muted-foreground">
                {isListening ? "Listening..." : "Tap to speak"}
              </p>
            )}
          </div>
          
          <Button 
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className="w-full"
            onClick={isListening ? stopListening : startListening}
            disabled={processingCommand}
          >
            {isListening ? (
              <>
                <X className="mr-2 h-4 w-4" /> Stop Listening
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" /> Start Listening
              </>
            )}
          </Button>
          
          {processingCommand && (
            <p className="text-muted-foreground animate-pulse">Processing command...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
