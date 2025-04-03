
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  X, 
  MessageSquare,
  Star,
  Sparkles,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

type AssistantProps = {
  isEnabled: boolean;
  toggleAssistant: () => void;
};

const AIAssistant = ({ isEnabled, toggleAssistant }: AssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  
  const assistantMessages = [
    "Based on your reading history, I think you'd enjoy 'One Piece' - it has great world-building and character development!",
    "Did you know? 'Demon Slayer' became one of the fastest manga series to reach 150 million copies in circulation.",
    "If you enjoy psychological thrillers, 'Death Note' explores fascinating moral dilemmas about justice and power.",
    "Looking for something heartwarming? Try 'Fruits Basket' for its beautiful story about family, friendship, and healing.",
    "For science fiction fans, 'Akira' revolutionized manga with its detailed artwork and complex cyberpunk themes."
  ];
  
  const displayRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * assistantMessages.length);
    setCurrentMessage(assistantMessages[randomIndex]);
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !currentMessage) {
      displayRandomMessage();
    }
  };
  
  if (!isEnabled) return null;
  
  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-40 transition-all duration-300 ease-in-out",
      isExpanded ? "w-80 sm:w-96" : "w-auto"
    )}>
      {isExpanded ? (
        <div className="glass-card rounded-lg overflow-hidden animate-fade-in">
          <div className="bg-manga-primary/80 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="font-medium text-white">MangaVerse AI</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={toggleAssistant}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-white hover:bg-white/20"
                onClick={toggleExpanded}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-card">
            {currentMessage && (
              <div className="flex mb-4 gap-3 animate-fade-in">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-manga-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-manga-primary" />
                  </div>
                </div>
                <div className="text-sm text-foreground/90">{currentMessage}</div>
              </div>
            )}
            
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs flex items-center gap-1 flex-1 bg-muted border-muted-foreground/30"
                onClick={displayRandomMessage}
              >
                <Star className="h-3 w-3" /> Recommend
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-xs flex items-center gap-1 flex-1 bg-muted border-muted-foreground/30"
              >
                <BookOpen className="h-3 w-3" /> Explain
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          className="rounded-full h-12 w-12 bg-manga-primary hover:bg-manga-secondary shadow-lg shadow-manga-primary/20"
          onClick={toggleExpanded}
        >
          <Bot className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default AIAssistant;
