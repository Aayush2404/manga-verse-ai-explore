
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <div className={cn("mb-8 text-center", className)}>
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
