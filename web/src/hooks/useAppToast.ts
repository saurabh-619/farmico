import { useToast, UseToastOptions } from "@chakra-ui/react";

const useAppToast = () => {
  const toast = useToast({
    isClosable: true,
    duration: 6000,
    status: "success",
    position: "bottom",
  });

  const triggerToast = (
    title: string,
    description?: string,
    status: "success" | "info" | "warning" | "error" | undefined = "success"
  ) => {
    toast({
      title,
      description,
      status,
    });
  };

  const triggerErrorToast = (title: string, error: any) => {
    toast({
      title,
      description: error.response.data.error,
      status: "error",
    });
  };

  return { triggerToast, triggerErrorToast };
};

export default useAppToast;
