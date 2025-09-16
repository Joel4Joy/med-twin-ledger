import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlockchainVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    transactionHash: string;
    blockNumber: string;
    timestamp: string;
    itemName: string;
    itemType: "medicine" | "prediction" | "transaction";
  };
}

export function BlockchainVerificationModal({
  isOpen,
  onClose,
  data,
}: BlockchainVerificationModalProps) {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCopyHash = () => {
    if (!data?.transactionHash) return;
    navigator.clipboard.writeText(data.transactionHash);
    toast({
      title: "Hash Copied",
      description: "Transaction hash copied to clipboard",
    });
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate blockchain verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Verification Complete",
        description: "Transaction verified on blockchain",
      });
    }, 2000);
  };

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blockchain" />
            <span>Blockchain Verification</span>
          </DialogTitle>
          <DialogDescription>
            Verify the authenticity and integrity of {data.itemName} on the blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between p-3 bg-blockchain-light rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blockchain" />
              <span className="font-medium">Verified on Blockchain</span>
            </div>
            <Badge variant="secondary" className="bg-blockchain text-blockchain-foreground">
              {data.itemType}
            </Badge>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Transaction Hash
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="flex-1 p-2 bg-muted rounded text-xs font-mono">
                  {data.transactionHash}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyHash}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Block Number
                </label>
                <p className="mt-1 font-mono text-sm">{data.blockNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Timestamp
                </label>
                <p className="mt-1 text-sm">{data.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex-1"
            >
              {isVerifying ? "Verifying..." : "Verify on Chain"}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <ExternalLink className="w-4 h-4" />
              <span>View on Explorer</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}