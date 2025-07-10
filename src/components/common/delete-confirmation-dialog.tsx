import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  itemType?: string;
  isLoading?: boolean;
  trigger?: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  itemType = "item",
  isLoading = false,
  confirmText = "Delete",
  cancelText = "Cancel",
}: DeleteConfirmationDialogProps) {
  const defaultTitle = title || `Delete ${itemType}`;
  const defaultDescription =
    description ||
    `Are you sure you want to delete ${
      itemName ? `"${itemName}"` : `this ${itemType}`
    }? This action cannot be undone.`;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <Card
          className="w-full max-w-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-lg">{defaultTitle}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground mb-6">{defaultDescription}</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                {cancelText}
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : confirmText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Hook for managing delete dialog state
export function useDeleteDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name?: string;
  } | null>(null);

  const openDialog = (id: number, name?: string) => {
    setItemToDelete({ id, name });
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setItemToDelete(null);
  };

  return {
    isOpen,
    itemToDelete,
    openDialog,
    closeDialog,
  };
}
