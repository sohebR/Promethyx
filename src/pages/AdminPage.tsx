import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockPolls } from "@/data/mockPolls";
import { 
  Plus, 
  Upload, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  Trash2,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    options: ["", ""],
    eligibleAddresses: "",
    startDate: "",
    endDate: "",
  });

  const handleAddOption = () => {
    if (formData.options.length < 6) {
      setFormData({ ...formData, options: [...formData.options, ""] });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData({ ...formData, options: newOptions });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleCreatePoll = () => {
    if (!formData.title || !formData.description || formData.options.some(o => !o)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Poll Created Successfully",
      description: "Your poll has been uploaded to IPFS and the Merkle root published.",
    });
    setShowCreateForm(false);
    setFormData({
      title: "",
      description: "",
      options: ["", ""],
      eligibleAddresses: "",
      startDate: "",
      endDate: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case "ended":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Ended</Badge>;
      case "draft":
        return <Badge variant="warning"><AlertCircle className="w-3 h-3 mr-1" />Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <Badge variant="glow" className="mb-4">Admin Dashboard</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Poll Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage private voting polls with ZK-powered eligibility verification.
          </p>
        </div>

        {/* Create Poll Button */}
        {!showCreateForm && (
          <Button 
            variant="glow" 
            size="lg" 
            className="mb-8"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-5 h-5" />
            Create New Poll
          </Button>
        )}

        {/* Create Poll Form */}
        {showCreateForm && (
          <Card variant="glow" className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Create New Poll
              </CardTitle>
              <CardDescription>
                Configure your poll settings. The eligibility list will be committed as a Merkle root.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Poll Title *
                </label>
                <Input
                  placeholder="e.g., Treasury Fund Allocation Q1 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Description *
                </label>
                <Textarea
                  placeholder="Describe what this poll is about and any relevant context..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Options */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Voting Options *
                </label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      {formData.options.length > 2 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {formData.options.length < 6 && (
                    <Button variant="outline" size="sm" onClick={handleAddOption}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Option
                    </Button>
                  )}
                </div>
              </div>

              {/* Eligible Addresses */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  <Users className="w-4 h-4 inline mr-1" />
                  Eligible Addresses
                </label>
                <Textarea
                  placeholder="Paste wallet addresses (one per line) or upload a CSV file..."
                  className="font-mono text-sm"
                  value={formData.eligibleAddresses}
                  onChange={(e) => setFormData({ ...formData, eligibleAddresses: e.target.value })}
                />
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="w-4 h-4 mr-1" />
                  Upload CSV
                </Button>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    End Date
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="glow" onClick={handleCreatePoll}>
                  <CheckCircle2 className="w-4 h-4" />
                  Create Poll
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Polls */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Your Polls</h2>
          <div className="grid gap-4">
            {mockPolls.map((poll) => (
              <Card key={poll.id} variant="glass" className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(poll.status)}
                        <span className="text-xs text-muted-foreground">
                          {poll.totalVotes} / {poll.eligibleVoters} voted
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {poll.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {poll.description}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {poll.startDate.toLocaleDateString()} - {poll.endDate.toLocaleDateString()}
                        </span>
                        <span>
                          {poll.options.length} options
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {poll.status === "draft" && (
                        <Button variant="default" size="sm">
                          Publish
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
