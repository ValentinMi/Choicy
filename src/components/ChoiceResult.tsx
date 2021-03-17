import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  keyframes,
  useMediaQuery,
} from "@chakra-ui/react";
import { CSSObject } from "@emotion/react";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Pie } from "@visx/shape";
import { PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import React, { useEffect, useMemo, useState } from "react";
import { getChoiceById } from "../api/choices.api";
import { IChoice } from "../types";
import ResultLine from "./ResultLine";
import { BsFillPieChartFill } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";

interface ChoiceResultProps {
  choiceObjectId: string;
  isOpen: boolean;
  onNextClick: () => void;
  isLastChoice: () => boolean;
}

const ChoiceResult: React.FC<ChoiceResultProps> = ({
  choiceObjectId,
  isOpen,
  onNextClick,
  isLastChoice,
}) => {
  const [choice, setChoice] = useState<IChoice>();
  const [chartCanBeDisplayed] = useMediaQuery("(min-width: 720px)");
  const [isResultChart, setIsResultChart] = useState<boolean>(true);

  const calculChosenRateForProposals = (choice: IChoice) => ({
    ...choice,
    proposals: choice.proposals.map((propo) => ({
      ...propo,
      rate: isNaN((propo.chosen / choice.vote) * 100) // Check if a value equal 0 => avoid NaN
        ? 0
        : (propo.chosen / choice.vote) * 100,
    })),
  });

  useEffect(() => {
    async function fetch() {
      let data = await getChoiceById(choiceObjectId);
      data = calculChosenRateForProposals(data);
      setChoice(data);
    }
    if (isOpen) {
      fetch();
    }
  }, [choiceObjectId, isOpen]);

  const fade = keyframes`
  from { opacity: 0}; }
  to { opacity: 1}; }
`;

  const style = useMemo(() => {
    const base: CSSObject = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
    };
    if (isOpen)
      return {
        ...base,
        borderRadius: "10px",
        padding: "2rem",
        width: "70vw",
        maxWidth: "500px",
        minHeight: "562px",
      };
    return { ...base, borderRadius: "50%", height: "80px", width: "80px" };
  }, [isOpen]);

  const pieData = choice?.proposals.map((propo) => {
    return {
      name: propo.title,
      value: propo.rate,
    };
  });

  return (
    <>
      {isOpen && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="rgba(0, 0,0, 0.5)"
          zIndex={6}
        />
      )}
      <Flex
        animation={isOpen ? `${fade} ease 1.2s` : "none"}
        css={style}
        direction="column"
        justify="center"
        align="center"
        zIndex={7}
      >
        {!isOpen ? (
          <Heading
            as="h2"
            size="lg"
            fontWeight="bold"
            borderRadius="10px"
            p="10px"
          >
            OR
          </Heading>
        ) : (
          <Flex
            direction="column"
            w="100%"
            align="space-around"
            justify="space-around"
            height="450px"
          >
            {choice && chartCanBeDisplayed && isResultChart ? (
              <MyPie data={pieData} width={450} height={450} />
            ) : (
              choice?.proposals.map((propo, i) => (
                <Box my={[2, 2, 5]} key={"result" + i}>
                  <ResultLine label={propo.title} rate={propo.rate!} />
                </Box>
              ))
            )}
          </Flex>
        )}
        {isOpen && isLastChoice() === false ? (
          <Flex mt={2}>
            {chartCanBeDisplayed && (
              <>
                {isResultChart ? (
                  <IconButton
                    colorScheme="whatsapp"
                    mx={2}
                    aria-label="Toggle pie"
                    icon={<Icon as={RiBarChartHorizontalFill} />}
                    onClick={() => setIsResultChart(false)}
                  />
                ) : (
                  <IconButton
                    colorScheme="whatsapp"
                    mx={2}
                    aria-label="Toggle line"
                    icon={<Icon as={BsFillPieChartFill} />}
                    onClick={() => setIsResultChart(true)}
                  />
                )}
              </>
            )}
            <Button onClick={onNextClick} colorScheme="blue">
              Next choice
            </Button>
          </Flex>
        ) : (
          isLastChoice() &&
          isOpen && (
            <Heading size="md" mt={2} textAlign="center">
              No more choices 😅
            </Heading>
          )
        )}
      </Flex>
    </>
  );
};

export default ChoiceResult;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

type ChoicePieData = {
  name: string;
  value: number;
};

type PieProps = {
  data: any;
  width: number;
  height: number;
  margin?: typeof defaultMargin;
};

function MyPie({ data, width, height, margin = defaultMargin }: PieProps) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + margin.top;
  const left = centerX + margin.left;

  const getProposalsFrequencyColor = scaleOrdinal({
    domain: data.map((propo: ChoicePieData) => propo.name),
    range: [
      "rgba(43,108,176,1)",
      "rgba(43,108,176,0.8)",
      "rgba(43,108,176,0.6)",
      "rgba(43,108,176,0.4)",
    ],
  });

  const frequency = (d: ChoicePieData) => d.value;

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie data={data} pieValue={frequency} outerRadius={radius}>
          {(pie) => {
            return pie.arcs.map((arc: PieArcDatum<ChoicePieData>, index) => {
              const { name } = arc.data;
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
              const arcPath = pie.path(arc);
              const arcFill = getProposalsFrequencyColor(name);
              return (
                <g key={`arc-${name}-${index}`}>
                  <path
                    d={arcPath !== null ? arcPath : undefined}
                    fill={arcFill}
                  />
                  {hasSpaceForLabel && (
                    <>
                      <text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={18}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {arc.data.name}
                      </text>
                      <text
                        x={centroidX}
                        y={centroidY + 30}
                        dy=".33em"
                        fill="#ffffff"
                        fontSize={18}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {Math.round(arc.data.value).toString()}%
                      </text>
                    </>
                  )}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
}
