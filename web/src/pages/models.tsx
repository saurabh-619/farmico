import * as apiHelper from "@/api/api.helper";
import { handleRequest } from "@/api/client";
import ModelDropzone from "@/components/models/ModelDropzone";
import AppButton from "@/elements/AppButton";
import useAppToast from "@/hooks/useAppToast";
import useLocale from "@/hooks/useLocale";
import useUser from "@/hooks/useUser";
import AppHeading from "@/layout/AppHeading";
import withAuth from "@/lib/withAuth";
import { uploadModelInputToFirebase } from "@/utils/helpers";
import { ISubtitleProps } from "@/utils/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Models: NextPage & ISubtitleProps = () => {
  const router = useRouter();
  const { t } = useLocale();
  const { triggerToast, triggerErrorToast } = useAppToast();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState(0);
  const imageRef = useRef<null | Blob>(null);

  const getPrediction = async (imgFile: Blob) => {
    const formData = new FormData();
    formData.append("image", imgFile!);

    if (currentModel === 0) {
      const {
        data: { confidence, label },
      } = await handleRequest(apiHelper.plantDiseaseDetection, formData);
      return { confidence, label };
    } else {
      const {
        data: { confidence, hasWeed, imgURL: output_url },
      } = await handleRequest(apiHelper.weedDetection, formData);
      return { confidence, hasWeed, output_url };
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    const imgFile = imageRef.current;

    try {
      if (imgFile === null) {
        return triggerToast(t.invalid_request, t.image_is_request, "error");
      }

      // upload input image
      const input_url = await uploadModelInputToFirebase(
        imgFile!,
        `/models/inputs/${user?._id}/${new Date().valueOf()}.${
          // @ts-ignore
          imgFile?.name!.split(".")[1]
        }`
      );

      // Get model predictions
      const { confidence, label, hasWeed, output_url } = await getPrediction(
        imgFile
      );

      // Save result
      const { data } = await handleRequest(
        currentModel === 0
          ? apiHelper.postADiseaseResult
          : apiHelper.postAWeedResult,
        {
          model_type: currentModel === 0 ? "disease" : "weed",
          confidence,
          label,
          hasWeed,
          ogImg: input_url,
          resultImg: output_url,
        }
      );

      // console.log({ data });
      router.push(`/result/${data.savedResult._id}`);
    } catch (error: any) {
      console.log({ error: error.message });
      triggerErrorToast(t.model_prediction_error, error);
    } finally {
      setLoading(false);
    }
  };

  const healthModelAPI = async () => {
    const currentDateSeconds = new Date().getSeconds();
    // console.log({ currentDateSeconds });
    if (0 < currentDateSeconds && currentDateSeconds < 20) {
      // console.log("Calling model api");
      apiHelper.helloModels();
    }
  };

  useEffect(() => {
    healthModelAPI();
  }, []);

  return (
    <Box pt="8" minH="75vh">
      <AppHeading title={t.aiTools} />
      <Box
        h="100%"
        w="70%"
        mx="auto"
        mt="8"
        py="8"
        borderRadius="sm"
        borderWidth="thin"
        borderColor="text.200"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Toggle models */}
        <Flex w="50%" borderRadius="sm" bg="text.50" alignItems="center">
          <Box
            py="2"
            px="4"
            w="270px"
            bg={`${currentModel === 0 ? "brand.main" : "text.50"}`}
            borderRadius="sm"
            className="cursor"
            onClick={() => setCurrentModel(0)}
          >
            <Heading
              as="h3"
              fontSize="lg"
              color={`${currentModel === 0 ? "white.main" : null}`}
              fontWeight="medium"
              textAlign="center"
            >
              {t.plant_disease_detection_model}
            </Heading>
          </Box>
          <Box
            py="2"
            px="4"
            w="270px"
            bg={`${currentModel === 1 ? "brand.main" : "text.50"}`}
            borderRadius="sm"
            className="cursor"
            onClick={() => setCurrentModel(1)}
          >
            <Heading
              as="h3"
              fontSize="lg"
              color={`${currentModel === 1 ? "white.main" : null}`}
              fontWeight="medium"
              textAlign="center"
            >
              {t.weed_detection_model}
            </Heading>
          </Box>
        </Flex>
        {/* Dropzone */}
        <ModelDropzone imageRef={imageRef} />
        {/* Predict */}
        <AppButton
          text={t.predict}
          //  @ts-ignore
          mt="8"
          width="350px"
          loading={loading}
          onClick={handlePredict}
          btnColor="black"
        />
      </Box>
    </Box>
  );
};

Models.subtitle = "AI Models";

export default withAuth(Models);
// export default Models;
