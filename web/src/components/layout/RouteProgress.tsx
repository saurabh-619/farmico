import { Box } from "@chakra-ui/react";
import { useNProgress } from "@tanem/react-nprogress";

interface IBarProps {
  animationDuration: number;
  progress: number;
}

const Bar: React.FC<IBarProps> = ({ animationDuration, progress }) => {
  return (
    <Box
      bg="success.400"
      h="1"
      w="full"
      pos="fixed"
      left="0"
      top="0"
      zIndex={50}
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    ></Box>
  );
};

interface IContainerProps {
  animationDuration: number;
  isFinished: boolean;
}

const Container: React.FC<IContainerProps> = ({
  children,
  animationDuration,
  isFinished,
}) => {
  return (
    <Box
      pointerEvents="none"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </Box>
  );
};

interface IRouteProgressProps {
  isAnimating: boolean;
}

const RouteProgress: React.FC<IRouteProgressProps> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container isFinished={isFinished} animationDuration={animationDuration}>
      <Bar progress={progress} animationDuration={animationDuration} />
    </Container>
  );
};

export default RouteProgress;
