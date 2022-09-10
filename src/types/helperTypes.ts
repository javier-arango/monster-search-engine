export type ContainerSize = {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export type SelectorPrompt = {
  labelId: String;
  selectorId: String;
  value: String | Number | null;
};

export type DialogSelectProps = {
  openDialog: boolean;
};
