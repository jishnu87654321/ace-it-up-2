import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail } from "lucide-react";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: string;
  isResponded: boolean;
  createdAt: string;
};

export default function AdminEnquiries() {
  const { toast } = useToast();
  const [items, setItems] = useState<Enquiry[]>([]);

  const fetchItems = async () => {
    try {
      const data = await apiFetch("/enquiries");
      if (data) setItems(data);
    } catch (e) {
      toast({ title: "Failed to fetch enquiries", variant: "destructive" });
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const markResponded = async (id: string) => {
    try {
      await apiFetch(`/enquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isResponded: true })
      });
      toast({ title: "Marked as responded" });
      fetchItems();
    } catch (e) {
      toast({ title: "Error changing status", variant: "destructive" });
    }
  };

  const renderTable = (filtered: Enquiry[]) => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e._id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone ?? "—"}</TableCell>
                <TableCell className="max-w-xs truncate">{e.message}</TableCell>
                <TableCell className="whitespace-nowrap">{new Date(e.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {e.isResponded
                    ? <span className="text-xs font-medium text-green-600 flex items-center gap-1"><Check size={12} /> Responded</span>
                    : <span className="text-xs font-medium text-destructive flex items-center gap-1"><Mail size={12} /> Pending</span>
                  }
                </TableCell>
                <TableCell>
                  {!e.isResponded && (
                    <Button size="sm" variant="outline" onClick={() => markResponded(e._id)}>Mark Done</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No enquiries</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Enquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all incoming messages and student enquiries.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchItems}>Refresh</Button>
      </div>
      
      {renderTable(items)}
    </div>
  );
}
