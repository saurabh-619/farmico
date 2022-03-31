import AppButton from "@/elements/AppButton";
import useLocale from "@/hooks/useLocale";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Heading,
  Button,
  FormControl,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";

interface IAppCancelModalProps {
  onClose: () => void;
  isOpen: boolean;
  onAccept: Function;
  commentText: string | null;
  setCommentText: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentModal: React.FC<IAppCancelModalProps> = ({
  onClose,
  isOpen,
  onAccept,
  commentText,
  setCommentText,
}) => {
  const { t } = useLocale();
  const isTextInvalid = () => {
    return (commentText && commentText?.length < 10) || false;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setCommentText(null);
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent pb="1" pt="4" px="0" maxW="auto" w="35%">
        <ModalBody>
          <FormControl isInvalid={isTextInvalid()}>
            <Textarea
              placeholder={t.comment_somehing_meaningful}
              resize="vertical"
              size="sm"
              value={commentText || ""}
              onChange={(e) => setCommentText(e.target.value)}
              _focus={{
                borderColor: isTextInvalid() ? "transparent" : "black",
                boxShadow: isTextInvalid()
                  ? "0 0 0 1.2px #e53e3e"
                  : "0 0 0 1.2px #000",
              }}
            />
            <FormErrorMessage mt="3" size="sm">
              {"*comment should be atleast 10 characters long."}
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter mt="4" pt="0">
          <Button
            variant="unstyled"
            mr={6}
            onClick={() => {
              onClose();
              setCommentText(null);
            }}
          >
            {t.cancel}
          </Button>
          <AppButton
            text={t.delete}
            width="80px"
            onClick={() => {
              if (isTextInvalid()) return;
              onClose();
              onAccept();
              setCommentText(null);
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
