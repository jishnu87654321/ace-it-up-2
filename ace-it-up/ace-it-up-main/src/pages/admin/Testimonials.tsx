import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Check, X } from "lucide-react";

type Testimonial = {
  _id: string;
  name: string;
  type: string;
  course?: string;
  rating?: number;
  review: string;
  isApproved: boolean;
};

export default function AdminTestimonials() {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "student", course: "", rating: "5", review: "" });

  const fetchItems = async () => {
    try {
      const data = await apiFetch("/testimonials");
      if (data) setItems(data);
    } catch (e) {
      toast({ title: "Error fetching testimonials", variant: "destructive" });
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.review.trim()) { toast({ title: "Name and review are required", variant: "destructive" }); return; }
    try {
      await apiFetch("/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name: form.name, type: form.type, course: form.course || null,
          rating: parseInt(form.rating), review: form.review, isApproved: true,
        })
      });
      toast({ title: "Testimonial added" });
      setDialogOpen(false);
      setForm({ name: "", type: "student", course: "", rating: "5", review: "" });
      fetchItems();
    } catch (e) {
      toast({ title: "Failed to add testimonial", variant: "destructive" });
    }
  };

  const toggleApproval = async (id: string, current: boolean) => {
    try {
      await apiFetch(`/testimonials/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isApproved: !current })
      });
      toast({ title: current ? "Testimonial unapproved" : "Testimonial approved" });
      fetchItems();
    } catch (e) {
      toast({ title: "Failed to update review", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/testimonials/${id}`, { method: 'DELETE' });
      toast({ title: "Testimonial deleted" });
      fetchItems();
    } catch (e) {
      toast({ title: "Failed to delete review", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">Team Feedback</h1>
        <Button onClick={() => setDialogOpen(true)} className="bg-accent-gradient"><Plus size={16} className="mr-1" /> Add Feedback</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t._id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="capitalize">{t.type}</TableCell>
                  <TableCell>{t.rating ? "⭐".repeat(t.rating) : "—"}</TableCell>
                  <TableCell>{t.isApproved ? <Check size={16} className="text-green-600" /> : <X size={16} className="text-destructive" />}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => toggleApproval(t._id, t.isApproved)}>
                        {t.isApproved ? "Unapprove" : "Approve"}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(t._id)}><Trash2 size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No testimonials</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Team Feedback</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="college">College/Institution</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Service related (optional)" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
            <Select value={form.rating} onValueChange={(v) => setForm({ ...form, rating: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((r) => <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? "s" : ""}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea placeholder="Review/Feedback Content" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} />
            <Button onClick={handleAdd} className="w-full bg-accent-gradient">Add Feedback</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
