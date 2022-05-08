import useLocale from "@/hooks/useLocale";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import AppButton from "./AppButton";

interface IAppCancelModalProps {
  onClose: () => void;
  isOpen: boolean;
  onAccept: Function;
  actionText?: string;
}

const AppCancelModal: React.FC<IAppCancelModalProps> = ({
  onClose,
  isOpen,
  onAccept,
  actionText,
}) => {
  const { t } = useLocale();

  actionText = actionText ?? t.delete;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent py="1" px="2" pt="4">
        <ModalBody>
          <Heading as="h3" fontSize="lg" fontWeight="medium">
            {t.are_you_sure}
          </Heading>
          <Heading
            as="h4"
            fontSize="md"
            fontWeight="normal"
            mt="4"
            color="text.400"
          >
            {t.this_action_cant_be_reversed}
          </Heading>
        </ModalBody>
        <ModalFooter>
          <Button variant="unstyled" mr={6} onClick={onClose}>
            {t.cancel}
          </Button>
          <AppButton
            text={actionText}
            width="80px"
            onClick={() => {
              onClose();
              onAccept();
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppCancelModal;
