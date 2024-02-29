import { ScrollView, Image } from "react-native";
import React from "react";
import { sharedStyles } from "@utils";
import { ScreenHeader } from "@components/shared";

export function Service({
  route: { params: { category, imageSrc } } = {
    params: { category: "", imageSrc: "" },
  },
}: {
  route?: {
    params: {
      category: string;
      imageSrc: string;
    };
  };
}) {
  return (
    <ScrollView style={sharedStyles.wrapper}>
      <ScreenHeader title={category} />
      <Image source={imageSrc} style={{ width: 100, height: 100 }} />
    </ScrollView>
  );
}
