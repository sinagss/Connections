import { useSelector } from "react-redux";
import strings from "../constants/strings";

export default function useStrings() {
  const locale = useSelector((state) => state.locale.locale);
  return strings[locale];
}
