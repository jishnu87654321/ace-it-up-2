import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Course = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  skillLevel?: string;
  isActive: boolean;
};

export default function AdminServices() {
  const { toast } = useToast();
  const [services, setServices] = useState<Course[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "", skillLevel: "" });

  const fetchServices = async () => {
    try {
      const data = await apiFetch("/courses");
      if (data) setServices(data);
    } catch (e) {
      toast({ title: "Error fetching services", variant: "destructive" });
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", skillLevel: "" });
    setDialogOpen(true);
  };

  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({ title: c.title, description: c.description ?? "", imageUrl: c.imageUrl ?? "", skillLevel: c.skillLevel ?? "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    try {
      if (editing) {
        await apiFetch(`/courses/${editing._id}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        toast({ title: "Course updated" });
      } else {
        await apiFetch("/courses", {
          method: 'POST',
          body: JSON.stringify(form)
        });
        toast({ title: "Course added" });
      }
      setDialogOpen(false);
      fetchServices();
    } catch (e: any) {
      toast({ title: e.message || "An error occurred", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiFetch(`/courses/${id}`, { method: 'DELETE' });
      toast({ title: "Service deleted" });
      fetchServices();
    } catch (e: any) {
      toast({ title: "Error deleting service", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">Services</h1>
        <Button onClick={openNew} className="bg-accent-gradient"><Plus size={16} className="mr-1" /> Add Service</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Skill Level</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((c) => (
                <TableRow key={c._id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="capitalize">{c.skillLevel ?? "—"}</TableCell>
                  <TableCell>{c.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil size={14} /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(c._id)}><Trash2 size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {services.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No services yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Service title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Image URL (e.g. /images/services/classroom.png)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            <Select value={form.skillLevel} onValueChange={(v) => setForm({ ...form, skillLevel: v })}>
              <SelectTrigger><SelectValue placeholder="Skill Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSave} className="w-full bg-accent-gradient">{editing ? "Update" : "Add"} Service</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
