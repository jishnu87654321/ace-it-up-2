import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { Edit, Save, RefreshCw } from "lucide-react";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";

interface StatItem {
  _id?: string;
  icon: string;
  value: number;
  label: string;
  order: number;
  isActive: boolean;
}

const iconOptions = [
  'GraduationCap', 'Briefcase', 'School', 'Presentation', 'Users', 'Award',
  'Target', 'TrendingUp', 'Star', 'Trophy', 'BookOpen', 'Building'
];

const defaultStats: StatItem[] = [
  { icon: 'GraduationCap', value: 0, label: 'Students Trained', order: 0, isActive: true },
  { icon: 'Briefcase', value: 0, label: 'Placements Achieved', order: 1, isActive: true },
  { icon: 'School', value: 0, label: 'Colleges Associated', order: 2, isActive: true },
  { icon: 'Presentation', value: 0, label: 'Workshops Conducted', order: 3, isActive: true }
];

export default function StatsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState<StatItem[]>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<StatItem>(defaultStats[0]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/stats/all');
      if (Array.isArray(data) && data.length > 0) {
        // Ensure we have exactly 4 stats, fill with defaults if needed
        const filledStats = [...data];
        while (filledStats.length < 4) {
          filledStats.push(defaultStats[filledStats.length]);
        }
        setStats(filledStats.slice(0, 4));
      } else {
        setStats(defaultStats);
      }
    } catch (error: any) {
      console.error('Failed to load stats:', error);
      setStats(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(stats[index]);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.label) {
      toast({ title: "Label is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const statToSave = { ...formData, order: editingIndex };
      
      if (formData._id) {
        // Update existing stat
        await apiFetch(`/stats/${formData._id}`, {
          method: 'PUT',
          body: JSON.stringify(statToSave)
        });
      } else {
        // Create new stat
        const created = await apiFetch('/stats', {
          method: 'POST',
          body: JSON.stringify(statToSave)
        });
        formData._id = created._id;
      }

      // Update local state
      const newStats = [...stats];
      newStats[editingIndex!] = formData;
      setStats(newStats);

      toast({ title: "Stat saved successfully!" });
      setDialogOpen(false);
    } catch (error: any) {
      toast({ title: "Failed to save stat", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      for (let i = 0; i < stats.length; i++) {
        const stat = { ...stats[i], order: i };
        if (stat._id) {
          await apiFetch(`/stats/${stat._id}`, {
            method: 'PUT',
            body: JSON.stringify(stat)
          });
        } else {
          const created = await apiFetch('/stats', {
            method: 'POST',
            body: JSON.stringify(stat)
          });
          stats[i]._id = created._id;
        }
      }
      toast({ title: "All statistics saved successfully!" });
      fetchStats();
    } catch (error: any) {
      toast({ title: "Failed to save statistics", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon || Icons.TrendingUp;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Statistics Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the 4 statistics displayed on your homepage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchStats} disabled={loading}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSaveAll} disabled={saving}>
            <Save size={16} className="mr-2" />
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = getIcon(stat.icon);
          return (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Stat {index + 1}</p>
                      <h3 className="font-semibold text-foreground">{stat.label}</h3>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Current Value</label>
                    <div className="text-4xl font-bold text-foreground">{stat.value.toLocaleString()}+</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full ${stat.isActive ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-600'}`}>
                      {stat.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span>•</span>
                    <span>Order: {index + 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Preview Section */}
      <Card className="bg-muted/30">
        <CardHeader>
          <h3 className="text-lg font-bold">Homepage Preview</h3>
          <p className="text-sm text-muted-foreground">This is how your statistics will appear on the homepage</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
            {stats.filter(s => s.isActive).map((stat, i) => {
              const IconComponent = getIcon(stat.icon);
              return (
                <div key={i} className="text-center">
                  <IconComponent size={28} className="text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value.toLocaleString()}+
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stat {editingIndex !== null ? editingIndex + 1 : ''}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Icon</label>
              <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => {
                    const IconComp = getIcon(icon);
                    return (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center gap-2">
                          <IconComp size={16} />
                          {icon}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Label</label>
              <Input
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                placeholder="e.g., Students Trained"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Value</label>
              <Input
                type="number"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium">Show on homepage</label>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
