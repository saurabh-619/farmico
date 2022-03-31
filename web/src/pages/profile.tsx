import Blogs from "@/components/profile/blogs/Blogs";
import Info from "@/components/profile/Info";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";
import Reports from "@/components/profile/reports/Reports";
import UpdateInfo from "@/components/profile/UpdateInfo";
import useLocale from "@/hooks/useLocale";
import AppHeading from "@/layout/AppHeading";
import withAuth from "@/lib/withAuth";
import { CURRENT_PROFILE_TYPE, ISubtitleProps } from "@/utils/types";
import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage & ISubtitleProps = () => {
  const { t } = useLocale();
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
          <AppHeading title={t.profile} />
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            mt="10"
          >
            <ProfileMenuItem
              text={t.my_info}
              type=""
              currentType={currentType}
            />
            <ProfileMenuItem
              text={t.reports}
              type={CURRENT_PROFILE_TYPE.REPORTS}
              currentType={currentType}
            />
            <ProfileMenuItem
              text={t.blogs}
              type={CURRENT_PROFILE_TYPE.BLOGS}
              currentType={currentType}
            />
            <ProfileMenuItem
              text={t.update_info}
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
