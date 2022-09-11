export type ContainerSize = {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export interface SelectorPrompt {
  labelId: String;
  selectorId: String;
  value: String | Number | null;
}

export interface DialogSelectProps {
  openDialog: boolean;
}
