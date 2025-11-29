export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'ended';
  merkleRoot: string;
  ipfsHash: string;
  totalVotes: number;
  eligibleVoters: number;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface VoteReceipt {
  pollId: string;
  timestamp: Date;
  proofHash: string;
  txHash: string;
  verified: boolean;
}

export interface WalletConnection {
  address: string;
  type: 'nami' | 'yoroi' | 'eternl' | 'lace';
  connected: boolean;
}

export interface EligibilityProof {
  valid: boolean;
  merkleProof: string[];
  commitment: string;
}
