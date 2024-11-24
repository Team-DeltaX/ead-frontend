import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
  export function AlertDialogComponent({
    handleOk,
    open,
    setOpen,
    handleOkAsync,
  }:{
    handleOk?: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleOkAsync?: () => Promise<void>;
  }) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently save your
              account and save your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={
              handleOkAsync ? handleOkAsync : handleOk
            }>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  