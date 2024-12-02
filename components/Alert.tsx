import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  
  export function AlertDialogComponent({
    handleOk,
    open,
    setOpen,
    title,
    description,
    handleOkAsync,
  }:{
    handleOk?: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    title?: string;
    description?: string;
    handleOkAsync?: () => Promise<void>;
  }) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        
        <AlertDialogContent className="font-SFPro">
          <AlertDialogHeader>
            <AlertDialogTitle>{
              title ? title : "Are you sure?"
              }</AlertDialogTitle>
            <AlertDialogDescription>
              {description ? description : "This action cannot be undone."}
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
  