import React from "react";
import { NextPage } from "next";
import withAuth from "@/lib/withAuth";
import { CURRENT_PROFILE_TYPE, ISubtitleProps } from "@/utils/types";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";
import Info from "@/components/profile/Info";
import UpdateInfo from "@/components/profile/UpdateInfo";
import Reports from "@/components/profile/Reports";
import Blogs from "@/components/profile/Blogs";

const Profile: NextPage & ISubtitleProps = () => {
  const router = useRouter();
  const currentType = router.query.type as CURRENT_PROFILE_TYPE;

  const getCurrentTypeComponent = (currentType: string) => {
    if (currentType === CURRENT_PROFILE_TYPE.INFO || currentType == undefined)
      return <Info />;
    if (currentType === CURRENT_PROFILE_TYPE.REPORTS) return <Reports />;
    if (currentType === CURRENT_PROFILE_TYPE.BLOGS) return <Blogs />;
    if (currentType === CURRENT_PROFILE_TYPE.UPDATE_INFO) return <UpdateInfo />;
  };

  return (
    <Box pt="8">
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Box className="left" w="15vw" minH="75vh">
          <Heading
            as="h3"
            fontSize={"x-large"}
            fontWeight="semibold"
            color="text.dark"
          >
            profile
          </Heading>
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            mt="10"
          >
            <ProfileMenuItem text="my info" type="" currentType={currentType} />
            <ProfileMenuItem
              text="reports"
              type={CURRENT_PROFILE_TYPE.REPORTS}
              currentType={currentType}
            />
            <ProfileMenuItem
              text="blogs"
              type={CURRENT_PROFILE_TYPE.BLOGS}
              currentType={currentType}
            />
            <ProfileMenuItem
              text="update info"
              type={CURRENT_PROFILE_TYPE.UPDATE_INFO}
              currentType={currentType}
            />
          </Flex>
        </Box>
        <Box className="right" w="100%" minH="75vh" p="8">
          {getCurrentTypeComponent(currentType)}
        </Box>
      </Flex>
    </Box>
  );
};

Profile.subtitle = "Profile";

export default withAuth(Profile);
