import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FC } from "react";

import menu from "/assets/menu.svg";

type DrawerProps = {
  drawercontent: React.ReactNode;
};

const DrawerCmp: FC<DrawerProps> = ({ drawercontent }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="border">
          <img src={menu} alt="menu" className="w-8 md:w-[50px]" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader aria-hidden="true">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div>
          <SheetClose></SheetClose>
          
          {drawercontent}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerCmp;
