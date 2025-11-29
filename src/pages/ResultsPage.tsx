import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPolls } from "@/data/mockPolls";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ExternalLink,
  Users,
  Vote,
  TrendingUp
} from "lucide-react";

export default function ResultsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case "ended":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Ended</Badge>;
      default:
        return null;
    }
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const getWinningOption = (poll: typeof mockPolls[0]) => {
    if (poll.totalVotes === 0) return null;
    return poll.options.reduce((prev, current) => 
      prev.votes > current.votes ? prev : current
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <Badge variant="glow" className="mb-4">
            <BarChart3 className="w-3 h-3 mr-1" />
            Live Results
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Election Results
          </h1>
          <p className="text-muted-foreground">
            View verifiable, ZK-proven election results. All tallies are computed on-chain.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Polls", value: mockPolls.length, icon: Vote },
            { label: "Active Polls", value: mockPolls.filter(p => p.status === "active").length, icon: TrendingUp },
            { label: "Total Votes", value: mockPolls.reduce((acc, p) => acc + p.totalVotes, 0).toLocaleString(), icon: Users },
            { label: "Verified Proofs", value: "100%", icon: Shield },
          ].map((stat) => (
            <Card key={stat.label} variant="glass">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Poll Results */}
        <div className="space-y-6">
          {mockPolls.filter(p => p.status !== "draft").map((poll) => {
            const winner = getWinningOption(poll);
            const participationRate = poll.eligibleVoters > 0 
              ? Math.round((poll.totalVotes / poll.eligibleVoters) * 100) 
              : 0;

            return (
              <Card key={poll.id} variant="glow" className="animate-fade-in">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(poll.status)}
                        {poll.status === "active" && (
                          <Badge variant="glass">
                            <Users className="w-3 h-3 mr-1" />
                            {participationRate}% participation
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{poll.title}</CardTitle>
                      <CardDescription className="mt-1">{poll.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">
                        {poll.totalVotes.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">total votes</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Results bars */}
                  <div className="space-y-4">
                    {poll.options.map((option) => {
                      const percentage = calculatePercentage(option.votes, poll.totalVotes);
                      const isWinner = winner?.id === option.id && poll.totalVotes > 0;
                      
                      return (
                        <div key={option.id}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={cn(
                              "text-sm font-medium",
                              isWinner ? "text-primary" : "text-foreground"
                            )}>
                              {option.label}
                              {isWinner && (
                                <Badge variant="glow" className="ml-2">
                                  Leading
                                </Badge>
                              )}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {option.votes.toLocaleString()} ({percentage}%)
                            </span>
                          </div>
                          <div className="h-3 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                isWinner 
                                  ? "bg-gradient-to-r from-primary to-accent" 
                                  : "bg-muted-foreground/30"
                              )}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Verification info */}
                  <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-success mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          ZK Verified
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          All votes verified with on-chain ZK proofs. No voter identities exposed.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Merkle Root: </span>
                            <code className="text-primary font-mono">
                              {poll.merkleRoot.slice(0, 16)}...
                            </code>
                          </div>
                          {poll.ipfsHash && (
                            <div>
                              <span className="text-muted-foreground">IPFS: </span>
                              <code className="text-accent font-mono">
                                {poll.ipfsHash.slice(0, 12)}...
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Verify
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
