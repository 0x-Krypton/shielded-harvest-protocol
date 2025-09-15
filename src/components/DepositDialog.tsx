import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poolName?: string;
}

const DepositDialog: React.FC<DepositDialogProps> = ({ open, onOpenChange, poolName }) => {
  const [amount, setAmount] = useState<string>("");
  const [token, setToken] = useState<string>("USDC");
  const [agree, setAgree] = useState<boolean>(false);

  const canConfirm = Number(amount) > 0 && agree;

  const handleConfirm = () => {
    toast.success(`Deposited ${amount} ${token}${poolName ? ` into ${poolName}` : ""}`);
    onOpenChange(false);
    setAmount("");
    setAgree(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deposit {poolName ? `to ${poolName}` : "to Pool"}</DialogTitle>
          <DialogDescription>
            Choose a token and amount to start farming. You can withdraw at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="token">Token</Label>
            <Select value={token} onValueChange={setToken}>
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
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
            <Label htmlFor="agree" className="text-muted-foreground">
              I understand strategies are encrypted and yields may vary.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="glow-border" disabled={!canConfirm} onClick={handleConfirm}>
            Confirm Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
