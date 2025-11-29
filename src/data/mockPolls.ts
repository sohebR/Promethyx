import { Poll } from "@/types/voting";

export const mockPolls: Poll[] = [
  {
    id: "poll-1",
    title: "Treasury Fund Allocation Q1 2025",
    description:
      "Vote on how the community treasury should allocate funds for the upcoming quarter. This proposal covers infrastructure development, marketing initiatives, and developer grants.",
    options: [
      { id: "opt-1", label: "Infrastructure Development (40%)", votes: 1247 },
      { id: "opt-2", label: "Marketing & Adoption (30%)", votes: 892 },
      { id: "opt-3", label: "Developer Grants (30%)", votes: 1456 },
    ],
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-02-15"),
    status: "active",
    merkleRoot:
      "0x8f4d3b2a1c9e7f6d5b4a3c2e1d0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e",
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    totalVotes: 3595,
    eligibleVoters: 12500,
  },
  {
    id: "poll-2",
    title: "Governance Parameter Update",
    description:
      "Proposal to update the governance action deposit amount and voting threshold parameters.",
    options: [
      { id: "opt-1", label: "Accept proposed changes", votes: 2103 },
      { id: "opt-2", label: "Reject and maintain current", votes: 847 },
      { id: "opt-3", label: "Defer for further discussion", votes: 556 },
    ],
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-01-25"),
    status: "ended",
    merkleRoot:
      "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    totalVotes: 3506,
    eligibleVoters: 10000,
  },
  {
    id: "poll-3",
    title: "Protocol Integration Roadmap Vote",
    description:
      "Community vote on the prioritization of upcoming protocol integration features for the next development cycle.",
    options: [
      { id: "opt-1", label: "DeFi toolkit", votes: 0 },
      { id: "opt-2", label: "Anonymous credential system", votes: 0 },
      { id: "opt-3", label: "Private voting infrastructure", votes: 0 },
      { id: "opt-4", label: "Confidential NFT minting", votes: 0 },
    ],
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-03-01"),
    status: "draft",
    merkleRoot: "",
    ipfsHash: "",
    totalVotes: 0,
    eligibleVoters: 15000,
  },
];
