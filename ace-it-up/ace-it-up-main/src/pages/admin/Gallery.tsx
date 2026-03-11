import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

type GalleryItem = {
  _id: string;
  imageUrl: string;
  category: string;
  caption?: string;
};

export default function AdminGallery() {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ category: "training", caption: "", imageUrl: "" });

  const fetchItems = async () => {
    try {
      const data = await apiFetch("/gallery");
      if (data) setItems(data);
    } catch (e) {
      toast({ title: "Failed to fetch gallery items", variant: "destructive" });
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async () => {
    if (!form.imageUrl.trim()) { toast({ title: "Please provide an image URL", variant: "destructive" }); return; }

    setUploading(true);
    try {
      await apiFetch("/gallery", {
        method: "POST",
        body: JSON.stringify({
          imageUrl: form.imageUrl,
          category: form.category,
          caption: form.caption || null,
        })
      });
      toast({ title: "Image uploaded" });
      setDialogOpen(false);
      setForm({ category: "training", caption: "", imageUrl: "" });
      fetchItems();
    } catch (e) {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    try {
      await apiFetch(`/gallery/${item._id}`, { method: 'DELETE' });
      toast({ title: "Image deleted" });
      fetchItems();
    } catch (e) {
      toast({ title: "Failed to delete image", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">Gallery</h1>
        <Button onClick={() => setDialogOpen(true)} className="bg-accent-gradient"><Plus size={16} className="mr-1" /> Add Image URL</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item._id} className="overflow-hidden group relative">
            <img src={item.imageUrl} alt={item.caption ?? ""} className="w-full h-40 object-cover" />
            <CardContent className="p-3">
              <p className="text-xs font-medium text-muted-foreground capitalize">{item.category}</p>
              {item.caption && <p className="text-sm text-foreground truncate">{item.caption}</p>}
            </CardContent>
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
              onClick={() => handleDelete(item)}
            >
              <Trash2 size={12} />
            </Button>
          </Card>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">No images uploaded</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Image Link</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Image URL (e.g. from Imgur or Cloudinary)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="training">Training Photos</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="workshops">Workshops</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            <Button onClick={handleUpload} className="w-full bg-accent-gradient" disabled={uploading}>
              {uploading ? "Uploading..." : "Save Image URL"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
