export const clearTaskItemFormInputFields = () => {
  const form = document.querySelector("#create-task-form") as HTMLFormElement;
  const inputs = form?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "input, textarea"
  );

  inputs?.forEach((input) => {
    input.value = "";
  });
};
