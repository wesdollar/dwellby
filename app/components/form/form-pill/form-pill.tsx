import { Box } from "@twilio-paste/core";
import type { FormPillStateReturn } from "@twilio-paste/core";
import { FormPill as PasteFormPill } from "@twilio-paste/core";

export type FormPillId = number;

interface FormPillProps {
  id: FormPillId;
  pillState: FormPillStateReturn;
  handleSetActiveToken: (id: FormPillId) => void;
  activeToken: number;
  name: string;
}

export const FormPill = ({
  id,
  pillState,
  handleSetActiveToken,
  activeToken,
  name,
}: FormPillProps) => {
  return (
    <PasteFormPill
      key={`filterToken-${id}`}
      {...pillState}
      onSelect={() => handleSetActiveToken(id)}
      selected={activeToken === id}
    >
      <Box minWidth={"32px"}>{name}</Box>
    </PasteFormPill>
  );
};
