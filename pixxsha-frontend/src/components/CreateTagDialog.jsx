import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { createTag } from "@/Features/Dialog";
export default function CreateTagDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const handleCreate = () => {
    const newTag = {
      id: Date.now(), // Generate a unique id, e.g., using timestamp
      name,
    };
    dispatch(createTag(newTag));
    setIsOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-none">
          <Plus className="h-4 w-4 mr-2" />
          Create Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Tag</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreate} className="rounded-none">
            Create Tag
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
