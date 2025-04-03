
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  className, 
  align = 'center' 
}: SectionTitleProps) => {
  return (
    <div className={cn(
      "mb-8",
      align === 'center' && "text-center",
      align === 'right' && "text-right",
      className
    )}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
