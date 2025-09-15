import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useShieldedHarvest } from "@/hooks/useContract";
import { TransactionStatus } from "@/components/TransactionStatus";
import { Loader2 } from "lucide-react";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poolName?: string;
}

const DepositDialog: React.FC<DepositDialogProps> = ({ open, onOpenChange, poolName }) => {
  const [amount, setAmount] = useState<string>("");
  const [token, setToken] = useState<string>("USDC");
  const [agree, setAgree] = useState<boolean>(false);
  
  const { 
    isConnected, 
    stake, 
    isPending, 
    isConfirming, 
    transactionStatus, 
    clearTransactionStatus 
  } = useShieldedHarvest();

  const canConfirm = Number(amount) > 0 && agree && isConnected && !isPending && !isConfirming;

  const handleConfirm = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      // For demo purposes, we'll use pool ID 0
      // In a real implementation, you'd map poolName to actual pool IDs
      const poolId = 0;
      
      await stake(poolId, amount);
      
      // Success toast will be handled by the transaction status
      toast.success(`Deposit initiated for ${amount} ${token}${poolName ? ` into ${poolName}` : ""}`);
      
      // Reset form after successful transaction
      setTimeout(() => {
        setAmount("");
        setAgree(false);
        onOpenChange(false);
      }, 2000);
      
    } catch (error) {
      console.error("Deposit failed:", error);
      toast.error("Deposit failed. Please try again.");
    }
  };

  const handleClose = () => {
    if (!isPending && !isConfirming) {
      onOpenChange(false);
      setAmount("");
      setAgree(false);
      clearTransactionStatus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit {poolName ? `to ${poolName}` : "to Pool"}</DialogTitle>
          <DialogDescription>
            Choose a token and amount to start farming. Your deposit will be encrypted and private.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Transaction Status */}
          <TransactionStatus
            type={transactionStatus.type}
            message={transactionStatus.message}
            onClear={clearTransactionStatus}
          />

          {!isConnected && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                Please connect your wallet to make a deposit
              </p>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="token">Token</Label>
            <Select value={token} onValueChange={setToken} disabled={isPending || isConfirming}>
              <SelectTrigger id="token">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.0001"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPending || isConfirming}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="agree" 
              checked={agree} 
              onCheckedChange={(v) => setAgree(Boolean(v))}
              disabled={isPending || isConfirming}
            />
            <Label htmlFor="agree" className="text-muted-foreground text-sm">
              I understand strategies are encrypted and yields may vary. This is a testnet transaction.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isPending || isConfirming}
          >
            Cancel
          </Button>
          <Button 
            className="glow-border" 
            disabled={!canConfirm} 
            onClick={handleConfirm}
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isPending ? "Confirming..." : "Processing..."}
              </>
            ) : (
              "Confirm Deposit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
