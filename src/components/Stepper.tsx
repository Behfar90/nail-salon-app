import { colors } from "@utils";
import { Dimensions, View } from "react-native";

export function Stepper({
  numberOfSteps,
  currentStep = 1,
}: {
  numberOfSteps: number;
  currentStep?: number;
}) {
  return (
    <View
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        width: Dimensions.get("screen").width * 0.8,
      }}
    >
      {Array.from(Array(numberOfSteps)).map((_, index) => (
        <View
          key={index}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor:
              index < currentStep ? colors.primary : colors.lightGray,
            marginHorizontal: 5,
          }}
        />
      ))}
    </View>
  );
}
