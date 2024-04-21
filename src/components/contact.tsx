import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export function Popup() {
    
    return (
        <Dialog>
            <DialogTrigger>
            <Button variant="outline" className="group flex items-center">
                <p className="group-hover:text-white text-xl mb-1">Contact</p>
            </Button>
            </DialogTrigger>
            <DialogContent className="scale-145">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Contactez-moi!</DialogTitle>
                    <DialogDescription className="text-lg">
                    <p>Vous pouvez me contactez par email: <span className="text-black dark:text-white">rifflartdamiencontact@gmail.com</span></p>
                    <p>Ou par téléphone: <br /> <span className="text-black dark:text-white">07 54 39 66 80</span></p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}