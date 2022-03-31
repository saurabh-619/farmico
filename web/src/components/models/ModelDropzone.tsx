import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";

interface IModelDropzoneProps {
  imageRef: React.MutableRefObject<any>;
}

const ModelDropzone: React.FC<IModelDropzoneProps> = ({ imageRef }) => {
  const { t } = useLocale();

  const { triggerToast } = useAppToast();
  const [imgPreviewUrl, setImgPreviewUrl] = useState<null | string>(null);

  const { getInputProps, getRootProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/*",
      maxSize: 1 * 1024 * 1024,
      maxFiles: 1,
      onDropRejected: (fileRejections) => {
        if (fileRejections[0].errors[0].code === "too-many-files") {
          triggerToast(t.invalid_request, t.only_one_file_is_allowed, "error");
        }
        if (fileRejections[0].errors[0].code === "file-too-large") {
          triggerToast(
            t.invalid_request,
            t.image_size_cant_exceed_1_mb,
            "error"
          );
        }
      },
      onDropAccepted: (acceptedFiles) => {
        const imgFile = acceptedFiles[0];
        imageRef.current = imgFile;
        setImgPreviewUrl(URL.createObjectURL(imgFile));
      },
    });

  const focusedStyle = {
    borderColor: "#fda7d5",
  };

  const acceptStyle = {
    borderColor: "#68D391",
  };

  const rejectStyle = {
    borderColor: "#F56565",
  };

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return imgPreviewUrl ? (
    <Box mt="12" p="0" height="300px" width="350px" position="relative">
      <Image src={imgPreviewUrl} objectFit="cover" layout="fill" />
      <Flex
        position="absolute"
        top="-1rem"
        right="-1rem"
        borderRadius="full"
        bg="white"
        h="35px"
        w="35px"
        justifyContent="center"
        alignItems="center"
        boxShadow="2xl"
        className="cursor"
        onClick={() => {
          imageRef.current = null;
          setImgPreviewUrl(null);
        }}
      >
        <FiX size={22} />
      </Flex>
    </Box>
  ) : (
    <Flex
      mt="12"
      h="300px"
      w="350px"
      borderStyle="dashed"
      borderWidth="4px"
      borderColor="text.500"
      borderRadius="sm"
      justifyContent="center"
      alignItems="center"
      {...getRootProps({ style })}
    >
      <input {...getInputProps()} />
      <Flex
        h="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <FiUploadCloud size={40} color="gray" />
        <Heading
          as="h3"
          fontWeight="medium"
          fontSize="xl"
          color="text.300"
          mt="4"
        >
          {t.drop_image_to_predict}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default ModelDropzone;
