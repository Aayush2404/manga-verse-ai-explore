
import { MangaItem } from "./MangaCard";
import MangaGrid from "./MangaGrid";
import SectionTitle from "./SectionTitle";

interface TrendingSectionProps {
  mangaList: MangaItem[];
}

const TrendingSection = ({ mangaList }: TrendingSectionProps) => {
  // Filter to get only trending manga
  const trendingManga = mangaList.filter(manga => manga.isTrending);
  
  return (
    <section id="trending" className="py-10">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Trending Now"
          subtitle="The hottest manga titles that everyone is reading"
        />
        <MangaGrid mangaList={trendingManga} />
      </div>
    </section>
  );
};

export default TrendingSection;
