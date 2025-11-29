import { ZKShield } from "@/components/icons/ZKShield";
import { Github, Twitter, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <ZKShield className="w-8 h-10" />
              <div>
                <h3 className="font-bold text-lg text-foreground">Invisible Voting Booth</h3>
                <p className="text-xs text-muted-foreground">Cardano Hackathon Asia 2025</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A privacy-preserving voting system powered by Zero-Knowledge Proofs 
              on Cardano and Midnight. Vote with complete anonymity while 
              maintaining verifiable election integrity.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://cardano.org" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Cardano <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://midnight.network" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Midnight Network <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-foreground" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Invisible Voting Booth. Built for IBW Edition Hackathon.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Testnet Active
          </div>
        </div>
      </div>
    </footer>
  );
}
