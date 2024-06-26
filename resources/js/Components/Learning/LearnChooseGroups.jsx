import { Container } from "@/Components/Container.jsx";
import { FormChild } from "@/Components/Form/FormChild.jsx";
import { useForm } from "react-hook-form";
import { FormSection } from "@/Components/Form/FormSection.jsx";
import { PlanningForm } from "@/Components/Form/PlanningForm.jsx";
import { GroupPropertiesForm } from "@/Components/Form/GroupPropertiesForm.jsx";
import { AnimatedCheckbox } from "@/Components/Form/AnimatedCheckbox.jsx";
import InputLabel from "@/Components/Form/InputLabel.jsx";

export const LearnChooseGroups = ({
  set,
  groupsProperties,
  handleSetComponentProperties,
  handleSetIsChoosingGroups,
  hasDifficult = false,
}) => {
  const {
    formState: { errors, dirtyFields },
    register,
    handleSubmit,
    getValues,
    setValue,
    resetField,
    setError,
  } = useForm({
    defaultValues: {
      groupsProperties,
      answersLanguage: [set.source_language, set.target_language],
    },
  });

  return (
    <Container className={"mt-4"}>
      <PlanningForm
        handleSubmit={handleSubmit}
        handleSetIsChoosingGroups={handleSetIsChoosingGroups}
        handleSetComponentProperties={handleSetComponentProperties}
        register={register}
        errors={errors}
        setError={setError}
        set={set}
        title={"Set up your learning plan"}
      >
        <FormSection title={"Groups"} className={"gap-2"}>
          {groupsProperties.map((group, index) => (
            <FormChild className={"gap-2 flex-col"} key={index}>
              <GroupPropertiesForm
                group={group}
                errors={errors}
                register={register}
                id={index}
                getValues={getValues}
                resetField={resetField}
              />
            </FormChild>
          ))}
        </FormSection>
      </PlanningForm>
    </Container>
  );
};