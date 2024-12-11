"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { CompleteProjectPhaseProps } from "@/types";
import { chooseNextPhaseAction } from "@/actions/next-phase";
import { useRouter } from "next/navigation";

type NextPhaseFormProps = {
  phase: string;
  project: CompleteProjectPhaseProps;
  onOpen: () => void;
};

const NextPhaseForm = ({ phase, project, onOpen }: NextPhaseFormProps) => {
  const router = useRouter();
  const form = useForm();

  async function onSubmit() {
    await chooseNextPhaseAction(phase, project);
    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={onOpen} type="button" variant="outline">
            Prekliči
          </Button>
          <Button type="submit">Končaj fazo</Button>
        </div>
      </form>
    </Form>
  );
};

export default NextPhaseForm;
