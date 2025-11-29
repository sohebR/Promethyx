import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProofAnimation } from "@/components/effects/ProofAnimation";
import { mockPolls } from "@/data/mockPolls";
import { cn } from "@/lib/utils";
import { 
  Wallet, 
  Shield, 
  CheckCircle2, 
  Vote, 
  Lock,
  ExternalLink,
  Copy,
  ArrowRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type VoteStep = "connect" | "select" | "vote" | "generating" | "complete";

const wallets = [
  { id: "nami", name: "Nami", icon: "🦊" },
  { id: "yoroi", name: "Yoroi", icon: "🌐" },
  { id: "eternl", name: "Eternl", icon: "♾️" },
  { id: "lace", name: "Lace", icon: "🎴" },
];

export default function VotePage() {
  const [step, setStep] = useState<VoteStep>("connect");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [receipt, setReceipt] = useState<{
    proofHash: string;
    txHash: string;
    timestamp: Date;
  } | null>(null);

  const activePoll = mockPolls.find(p => p.status === "active");

  const handleConnectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "addr1qx" + Array(56).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setWalletAddress(mockAddress);
      
      // Simulate eligibility check
      setTimeout(() => {
        setIsEligible(true);
        setStep("select");
        toast({
          title: "Eligibility Verified",
          description: "Your ZK proof confirms you are eligible to vote.",
        });
      }, 1500);
    }, 1000);
  };

  const handleSelectPoll = (pollId: string) => {
    setSelectedPoll(pollId);
    setStep("vote");
  };

  const handleCastVote = () => {
    if (!selectedOption) {
      toast({
        title: "Select an Option",
        description: "Please choose a voting option before submitting.",
        variant: "destructive",
      });
      return;
    }

    setStep("generating");
    setIsGenerating(true);

    // Simulate ZK proof generation
    setTimeout(() => {
      setIsGenerating(false);
      setReceipt({
        proofHash: "0x" + Array(64).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)
        ).join(''),
        txHash: "tx" + Array(64).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)
        ).join(''),
        timestamp: new Date(),
      });
      setStep("complete");
    }, 6000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Hash copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {["Connect", "Verify", "Vote", "Confirm"].map((label, index) => {
              const stepOrder = ["connect", "select", "vote", "complete"];
              const currentIndex = stepOrder.indexOf(step === "generating" ? "vote" : step);
              const isComplete = index < currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      isComplete && "bg-success text-success-foreground",
                      isCurrent && "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(185_100%_50%/0.4)]",
                      !isComplete && !isCurrent && "bg-muted text-muted-foreground"
                    )}>
                      {isComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <span className={cn(
                      "text-xs mt-2",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}>
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={cn(
                      "w-16 md:w-24 h-0.5 mx-2",
                      isComplete ? "bg-success" : "bg-muted"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Connect Wallet */}
          {step === "connect" && (
            <Card variant="glow" className="animate-fade-in">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Choose a Cardano wallet to verify your eligibility using a Zero-Knowledge Proof.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {wallets.map((wallet) => (
                    <Button
                      key={wallet.id}
                      variant="glass"
                      size="lg"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => handleConnectWallet(wallet.id)}
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span>{wallet.name}</span>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Privacy First</p>
                      <p className="text-xs text-muted-foreground">
                        Your wallet address is only used to generate a ZK proof. 
                        It is never stored or linked to your vote.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Select Poll */}
          {step === "select" && (
            <div className="space-y-6 animate-fade-in">
              {/* Connected wallet info */}
              <Card variant="glass">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Wallet Connected</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {walletAddress?.slice(0, 12)}...{walletAddress?.slice(-8)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Eligible</Badge>
                </CardContent>
              </Card>

              {/* Active Polls */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Active Polls</h2>
                {activePoll ? (
                  <Card 
                    variant="glow" 
                    className="cursor-pointer hover:border-primary/60 transition-all"
                    onClick={() => handleSelectPoll(activePoll.id)}
                  >
                    <CardContent className="p-6">
                      <Badge variant="success" className="mb-3">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {activePoll.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {activePoll.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {activePoll.totalVotes} votes cast
                        </span>
                        <Button variant="default" size="sm">
                          Vote Now
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card variant="glass">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No active polls at the moment.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Cast Vote */}
          {step === "vote" && activePoll && (
            <Card variant="glow" className="animate-fade-in">
              <CardHeader>
                <Badge variant="glow" className="w-fit mb-2">
                  <Lock className="w-3 h-3 mr-1" />
                  Private Vote
                </Badge>
                <CardTitle>{activePoll.title}</CardTitle>
                <CardDescription>{activePoll.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {activePoll.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={cn(
                        "w-full p-4 rounded-lg border text-left transition-all",
                        selectedOption === option.id
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(185_100%_50%/0.2)]"
                          : "border-border bg-card hover:border-border/80 hover:bg-card/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          selectedOption === option.id
                            ? "border-primary"
                            : "border-muted-foreground"
                        )}>
                          {selectedOption === option.id && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className={cn(
                          "font-medium",
                          selectedOption === option.id ? "text-primary" : "text-foreground"
                        )}>
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCastVote}
                >
                  <Vote className="w-5 h-5" />
                  Cast Private Vote
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Your vote will be encrypted and a ZK proof generated in your browser.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Generating Proof */}
          {step === "generating" && (
            <Card variant="glow" className="animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Generating ZK Proof
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your vote is being encrypted and a Zero-Knowledge Proof is being generated...
                  </p>
                </div>
                <ProofAnimation 
                  isGenerating={isGenerating} 
                  isComplete={!isGenerating && step === "generating"} 
                />
              </CardContent>
            </Card>
          )}

          {/* Vote Complete */}
          {step === "complete" && receipt && (
            <Card variant="glow" className="animate-fade-in">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Vote Submitted!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your private vote has been recorded on-chain with a valid ZK proof.
                </p>

                {/* Receipt */}
                <div className="bg-card rounded-lg border border-border p-4 text-left space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Proof Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-primary font-mono truncate flex-1">
                        {receipt.proofHash}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 h-8 w-8"
                        onClick={() => copyToClipboard(receipt.proofHash)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-accent font-mono truncate flex-1">
                        {receipt.txHash}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 h-8 w-8"
                        onClick={() => copyToClipboard(receipt.txHash)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                    <p className="text-sm text-foreground">
                      {receipt.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 justify-center">
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View on Explorer
                  </Button>
                  <Button variant="default" onClick={() => {
                    setStep("connect");
                    setSelectedOption(null);
                    setReceipt(null);
                  }}>
                    Vote Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
