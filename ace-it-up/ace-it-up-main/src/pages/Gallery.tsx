import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { apiFetch } from "@/lib/api";

const categories = ["All", "training", "events", "workshops", "other"];

type GalleryItem = {
  _id: string;
  imageUrl: string;
  category: string;
  caption?: string;
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        console.log('Fetching gallery items...');
        const data = await apiFetch("/gallery");
        console.log('Gallery items received:', data);
        if (Array.isArray(data)) {
          setGalleryItems(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Invalid data format received');
        }
      } catch (e: any) {
        console.error("Failed to fetch gallery", e);
        setError(e.message || 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((i) => i.category.toLowerCase() === activeCategory);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-hero-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Gallery</h1>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-4 text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">Unable to Load Gallery</h2>
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-muted-foreground text-sm mb-6">
              Make sure the backend server is running:
              <code className="block mt-2 bg-muted p-2 rounded text-xs">
                cd backend && npm run dev
              </code>
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Gallery</h1>

          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLightbox(item.imageUrl)}
                className="aspect-[4/3] rounded-2xl bg-primary/5 border border-border cursor-pointer hover:shadow-card-hover transition-all flex items-center justify-center overflow-hidden"
              >
                <img src={item.imageUrl} alt={item.caption || "Gallery item"} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>

          {galleryItems.length === 0 && (
            <p className="text-center text-muted-foreground mt-12 text-sm">
              Our gallery is being updated. Check back soon!
            </p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-background hover:text-accent transition-colors"
          >
            <X size={28} />
          </button>
          <div className="bg-card rounded-2xl w-full max-w-3xl aspect-video flex items-center justify-center overflow-hidden relative">
            <img src={lightbox} alt="Preview" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </Layout>
  );
}
