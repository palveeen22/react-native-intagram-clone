import { Text } from "react-native";

export default function ErrorText({ error }) {
  if (!error) return <></>;

  return <Text>{error?.message || "Internal Server Error"}</Text>;
}
