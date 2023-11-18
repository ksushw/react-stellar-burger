import { ChangeEvent, Dispatch } from "react";

export default function handleChange(
  e: ChangeEvent<HTMLInputElement>,
  setFunction: Dispatch<string>,
): void {
  setFunction(e.target.value);
}
