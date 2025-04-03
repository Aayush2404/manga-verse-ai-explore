
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Search, 
  Menu, 
  X,
  User,
  BookOpen,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      // If not on the home page, navigate there first
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: sectionId } });
        return;
      }
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-manga-primary" />
          <span className="font-bold text-xl hidden md:inline-block">MangaVerse</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('trending')}
            className={cn(
              "text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-manga-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              activeSection === 'trending' && "text-manga-primary font-medium after:scale-x-100 after:origin-bottom-left"
            )}
          >
            Trending
          </button>
          <button
            onClick={() => scrollToSection('critics-picks')}
            className={cn(
              "text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-manga-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              activeSection === 'critics-picks' && "text-manga-primary font-medium after:scale-x-100 after:origin-bottom-left"
            )}
          >
            <Award className="w-4 h-4 inline-flex mr-1" />
            Critics' Picks
          </button>
          <button 
            onClick={() => scrollToSection('genres')}
            className={cn(
              "text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-manga-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              activeSection === 'genres' && "text-manga-primary font-medium after:scale-x-100 after:origin-bottom-left"
            )}
          >
            Genres
          </button>
          <button 
            onClick={() => scrollToSection('surprise')}
            className={cn(
              "text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-manga-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              activeSection === 'surprise' && "text-manga-primary font-medium after:scale-x-100 after:origin-bottom-left"
            )}
          >
            Surprise Me
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary">
            <User className="w-5 h-5" />
          </Button>
          <Button className="bg-manga-primary hover:bg-manga-secondary text-white">
            <Book className="mr-2 h-4 w-4" /> Read Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-0 top-16 z-50 bg-background border-t border-border md:hidden transition-transform duration-300",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <nav className="flex flex-col p-6 gap-6">
            <button 
              className={cn(
                "text-left text-foreground/80 hover:text-primary transition-colors py-2",
                activeSection === 'trending' && "text-manga-primary font-medium"
              )}
              onClick={() => scrollToSection('trending')}
            >
              Trending
            </button>
            <button
              className={cn(
                "text-left flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors py-2",
                activeSection === 'critics-picks' && "text-manga-primary font-medium"
              )}
              onClick={() => scrollToSection('critics-picks')}
            >
              <Award className="w-4 h-4" />
              Critics' Picks
            </button>
            <button 
              className={cn(
                "text-left text-foreground/80 hover:text-primary transition-colors py-2",
                activeSection === 'genres' && "text-manga-primary font-medium"
              )}
              onClick={() => scrollToSection('genres')}
            >
              Genres
            </button>
            <button 
              className={cn(
                "text-left text-foreground/80 hover:text-primary transition-colors py-2",
                activeSection === 'surprise' && "text-manga-primary font-medium"
              )}
              onClick={() => scrollToSection('surprise')}
            >
              Surprise Me
            </button>
            <Button 
              variant="outline" 
              className="flex items-center justify-start gap-2 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="w-4 h-4" /> Search
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-start gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-4 h-4" /> Profile
            </Button>
            <Button 
              className="bg-manga-primary hover:bg-manga-secondary text-white mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Book className="mr-2 h-4 w-4" /> Read Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
