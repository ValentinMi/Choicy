import { Button, ButtonGroup } from "@chakra-ui/button";
import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Portal } from "@chakra-ui/portal";
import React from "react";

import { deleteChoiceById } from "../../api/choices.api";
interface ChoiceDeleteButtonProps {
  id: string;
  refresh: Function;
}

const ChoiceDeleteButton: React.FC<ChoiceDeleteButtonProps> = ({
  id,
  refresh,
}) => {
  const handleApply = async (id: string) => {
    await deleteChoiceById(id);
    await refresh();
  };
  return (
    <Popover closeOnBlur={false} placement="left">
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button colorScheme="red">Delete</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Confirmation</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                Are you sure you want to continue with your action?
              </PopoverBody>
              <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => handleApply(id)}>
                    Apply
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export default ChoiceDeleteButton;
