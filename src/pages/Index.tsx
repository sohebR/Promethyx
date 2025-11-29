import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/effects/GridBackground";
import { ZKShield } from "@/components/icons/ZKShield";
import { 
  Shield, 
  Eye, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Vote,
  Users,
  FileCheck,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Complete Anonymity",
    description: "Your identity is never revealed. Zero-Knowledge Proofs ensure your vote is counted without exposing who you are.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Votes are encrypted client-side using the WASM prover before ever leaving your browser.",
  },
  {
    icon: CheckCircle2,
    title: "Verifiable Results",
    description: "Anyone can verify the election integrity through on-chain proofs without compromising voter privacy.",
  },
  {
    icon: Zap,
    title: "Midnight Network",
    description: "Powered by Midnight's Compact smart contracts for privacy-preserving computation on Cardano.",
  },
];

const stats = [
  { value: "100%", label: "Anonymous" },
  { value: "0", label: "Data Exposed" },
  { value: "∞", label: "Verifiable" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <GridBackground className="pt-16">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Badge variant="glow" className="mb-6 animate-fade-in">
              <Shield className="w-3 h-3 mr-1" />
             The Future of Trust: Private Votes, Public Verification.
            </Badge>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">Vote </span>
              <span className="text-gradient">Invisibly</span>
              <span className="text-foreground">,</span>
              <br />
              <span className="text-foreground">Verify </span>
              <span className="text-gradient">Publicly</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The first truly private voting system on Cardano. Cast your vote with 
              Zero-Knowledge Proofs—complete anonymity, mathematically guaranteed integrity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/vote">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Vote className="w-5 h-5" />
                  Cast Your Vote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  Create a Poll
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GridBackground>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Privacy Without Compromise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our ZK-powered voting system ensures your voice is heard while keeping your identity completely private.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              icon: Users,
              title: "Connect & Verify",
              description: "Connect your Cardano wallet. Your eligibility is verified using a ZK proof—no personal data is shared.",
            },
            {
              step: "02",
              icon: Lock,
              title: "Vote Privately",
              description: "Your vote is encrypted in your browser using a WASM prover. The ZK proof is generated locally.",
            },
            {
              step: "03",
              icon: FileCheck,
              title: "Verify Publicly",
              description: "Results are tallied on-chain. Anyone can verify integrity without knowing who voted for what.",
            },
          ].map((item, index) => (
            <Card key={item.step} variant="glow" className="relative overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <span className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-card/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for True Privacy
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={feature.title} variant="glass" className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powered by Cutting-Edge Cryptography
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Cardano", desc: "Settlement Layer" },
              { name: "Midnight", desc: "ZK Smart Contracts" },
              { name: "WASM Prover", desc: "Client-Side Proofs" },
              { name: "IPFS", desc: "Decentralized Storage" },
            ].map((tech) => (
              <Card key={tech.name} variant="default" className="text-center p-6">
                <p className="font-semibold text-foreground">{tech.name}</p>
                <p className="text-xs text-muted-foreground">{tech.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card variant="gradient" className="max-w-4xl mx-auto overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <ZKShield className="w-16 h-20 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Vote Privately?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of voters who trust the Invisible Voting Booth for secure, 
                anonymous, and verifiable elections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/vote">
                  <Button variant="hero" size="lg">
                    <Vote className="w-5 h-5" />
                    Start Voting
                  </Button>
                </Link>
                <Link to="/results">
                  <Button variant="outline" size="lg">
                    View Results
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
