
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Search, 
  Menu, 
  X,
  User,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <a href="#trending" className="text-foreground/80 hover:text-primary transition-colors">
            Trending
          </a>
          <a href="#genres" className="text-foreground/80 hover:text-primary transition-colors">
            Genres
          </a>
          <a href="#surprise" className="text-foreground/80 hover:text-primary transition-colors">
            Surprise Me
          </a>
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
            <a 
              href="#trending" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </a>
            <a 
              href="#genres" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Genres
            </a>
            <a 
              href="#surprise" 
              className="text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Surprise Me
            </a>
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
