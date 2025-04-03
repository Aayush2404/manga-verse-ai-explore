
import { BookOpen, Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-8 bg-manga-dark border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-manga-primary" />
              <span className="font-bold text-xl">MangaVerse</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your ultimate destination for discovering and enjoying manga with AI-powered assistance.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#trending" className="hover:text-foreground transition-colors">Trending</a></li>
              <li><a href="#genres" className="hover:text-foreground transition-colors">Genres</a></li>
              <li><a href="#surprise" className="hover:text-foreground transition-colors">Surprise Me</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 MangaVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
