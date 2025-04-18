"use server";

import { CompleteProjectPhaseProps } from "@/types";
import { addPhase, getProjectPhases, updatePhase } from "./project-phases";
import { getProjectPhase } from "@/utils";
import { updateProject } from "./projects";
import { revalidatePath } from "next/cache";
import { getUser } from "./auth";

// 4 situations:
// 1. Next project is null -> the phase doesnt exist yet -> add new phase and redirect there -> also close the current phase
// 2. Next project status is v čakanju -> the same process as in the first situation
// 3. Next project status is v teku -> just finish the current phase and redirect to the next phase
// 4. Next project status is zaključeno -> now you need to finish current phase and redirect to the phase after the next phase

export const chooseNextPhaseAction = async (
  next_phase_name: string,
  current_phase: CompleteProjectPhaseProps
) => {
  const [{ data }, user] = await Promise.all([
    getProjectPhases(current_phase.project_data.id),
    getUser(),
  ]);
  if (next_phase_name === "urednistvo") {
    const next_phase = getProjectPhase(data, next_phase_name);
    if (next_phase === null) {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: "osnutek",
        }),
        addPhase(
          {
            project_id: current_phase.project_id,
            name: next_phase_name,
            status: "v teku",
            start_date: new Date(),
          },
          user.id
        ),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 1
                ? current_phase.project_data.napredek
                : 1,
            status: "v teku",
            start_date: new Date(),
            stanje:
              current_phase.project_data.napredek > 0
                ? current_phase.project_data.napredek
                : 0,
          },
          current_phase.project_id
        ),
      ]);
    } else if (next_phase.status === "v čakanju") {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: "osnutek",
        }),
        updatePhase(next_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "v teku",
          start_date: new Date(),
          name: next_phase_name,
        }),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 1
                ? current_phase.project_data.napredek
                : 1,
            status: "v teku",
            start_date: new Date(),
            stanje:
              current_phase.project_data.napredek > 0
                ? current_phase.project_data.napredek
                : 0,
          },
          current_phase.project_id
        ),
      ]);
    } else {
      await updatePhase(current_phase.id, user.id, {
        project_id: current_phase.project_data.id,
        status: "zaključeno",
        end_date: new Date(),
        name: "osnutek",
      });
    }
  } else if (next_phase_name === "priprava-in-oblikovanje") {
    const next_phase = getProjectPhase(data, next_phase_name);
    if (next_phase === null) {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: "urednistvo",
        }),
        addPhase(
          {
            project_id: current_phase.project_id,
            name: next_phase_name,
            status: "v teku",
            start_date: new Date(),
          },
          user.id
        ),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 2
                ? current_phase.project_data.napredek
                : 2,
            status: "v teku",
            stanje:
              current_phase.project_data.napredek > 25
                ? current_phase.project_data.napredek
                : 25,
          },
          current_phase.project_id
        ),
      ]);
    } else if (next_phase.status === "v čakanju") {
      await Promise.all([
        updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: "urednistvo",
        }),
        updatePhase(next_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "v teku",
          start_date: new Date(),
          name: next_phase_name,
        }),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 2
                ? current_phase.project_data.napredek
                : 2,
            status: "v teku",
            stanje:
              current_phase.project_data.napredek > 25
                ? current_phase.project_data.napredek
                : 25,
          },
          current_phase.project_id
        ),
      ]);
    } else if (next_phase.status === "zaključeno") {
      const next_phase = getProjectPhase(data, "tisk");
      if (next_phase === null) {
        await Promise.all([
          await updatePhase(current_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "zaključeno",
            end_date: new Date(),
            name: "urednistvo",
          }),
          addPhase(
            {
              project_id: current_phase.project_id,
              name: "tisk",
              status: "v teku",
              start_date: new Date(),
            },
            user.id
          ),
          updateProject(
            {
              napredek:
                current_phase.project_data.napredek > 3
                  ? current_phase.project_data.napredek
                  : 3,
              status: "v teku",
              stanje:
                current_phase.project_data.napredek > 50
                  ? current_phase.project_data.napredek
                  : 50,
            },
            current_phase.project_id
          ),
        ]);
      } else if (next_phase.status === "v čakanju") {
        await Promise.all([
          await updatePhase(current_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "zaključeno",
            end_date: new Date(),
            name: "urednistvo",
          }),
          updatePhase(next_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "v teku",
            start_date: new Date(),
            name: next_phase_name,
          }),
          updateProject(
            {
              napredek:
                current_phase.project_data.napredek > 3
                  ? current_phase.project_data.napredek
                  : 3,
              status: "v teku",
              stanje:
                current_phase.project_data.napredek > 50
                  ? current_phase.project_data.napredek
                  : 50,
            },
            current_phase.project_id
          ),
        ]);
      }
    } else {
      await updatePhase(current_phase.id, user.id, {
        project_id: current_phase.project_data.id,
        status: "zaključeno",
        end_date: new Date(),
        name: "urednistvo",
      });
    }
  } else if (next_phase_name === "tisk") {
    const next_phase = getProjectPhase(data, next_phase_name);
    const urednistvo_phase = getProjectPhase(data, "urednistvo");
    if (
      urednistvo_phase?.status === "zaključeno" ||
      current_phase.project_data.type === "drugo"
    ) {
      if (next_phase === null) {
        await Promise.all([
          await updatePhase(current_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "zaključeno",
            end_date: new Date(),
            name: current_phase.name,
          }),
          addPhase(
            {
              project_id: current_phase.project_id,
              name: next_phase_name,
              status: "v teku",
              start_date: new Date(),
            },
            user.id
          ),
          updateProject(
            {
              napredek:
                current_phase.project_data.napredek > 3
                  ? current_phase.project_data.napredek
                  : 3,
              status: "v teku",
              stanje:
                current_phase.project_data.napredek > 50
                  ? current_phase.project_data.napredek
                  : 50,
            },
            current_phase.project_id
          ),
        ]);
      } else if (next_phase.status === "v čakanju") {
        await Promise.all([
          await updatePhase(current_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "zaključeno",
            end_date: new Date(),
            name: current_phase.name,
          }),
          updatePhase(next_phase.id, user.id, {
            project_id: current_phase.project_data.id,
            status: "v teku",
            start_date: new Date(),
            name: next_phase_name,
          }),
          updateProject(
            {
              napredek:
                current_phase.project_data.napredek > 3
                  ? current_phase.project_data.napredek
                  : 3,
              status: "v teku",
              stanje:
                current_phase.project_data.napredek > 50
                  ? current_phase.project_data.napredek
                  : 50,
            },
            current_phase.project_id
          ),
        ]);
      } else {
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: current_phase.name,
        });
      }
    } else {
      await updatePhase(current_phase.id, user.id, {
        project_id: current_phase.project_data.id,
        status: "zaključeno",
        end_date: new Date(),
        name: current_phase.name,
      });
    }
  } else if (next_phase_name === "distribucija") {
    const next_phase = getProjectPhase(data, next_phase_name);
    if (next_phase === null) {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: current_phase.name,
        }),
        addPhase(
          {
            project_id: current_phase.project_id,
            name: next_phase_name,
            status: "v teku",
            start_date: new Date(),
          },
          user.id
        ),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 4
                ? current_phase.project_data.napredek
                : 4,
            status: "v teku",
            stanje:
              current_phase.project_data.napredek > 75
                ? current_phase.project_data.napredek
                : 75,
          },
          current_phase.project_id
        ),
      ]);
    } else if (next_phase.status === "v čakanju") {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: current_phase.name,
        }),
        updatePhase(next_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "v teku",
          start_date: new Date(),
          name: next_phase_name,
        }),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 4
                ? current_phase.project_data.napredek
                : 4,
            status: "v teku",
            stanje:
              current_phase.project_data.napredek > 75
                ? current_phase.project_data.napredek
                : 75,
          },
          current_phase.project_id
        ),
      ]);
    } else {
      await updatePhase(current_phase.id, user.id, {
        project_id: current_phase.project_data.id,
        status: "zaključeno",
        end_date: new Date(),
        name: current_phase.name,
      });
    }
  } else if (next_phase_name === "arhiv") {
    const next_phase = getProjectPhase(data, next_phase_name);
    if (next_phase === null) {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: current_phase.name,
        }),
        addPhase(
          {
            project_id: current_phase.project_id,
            name: next_phase_name,
            status: "v teku",
            start_date: new Date(),
          },
          user.id
        ),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 4
                ? current_phase.project_data.napredek
                : 4,
            status: "zaključeno",
            end_date: new Date(),
            stanje:
              current_phase.project_data.napredek > 100
                ? current_phase.project_data.napredek
                : 100,
          },
          current_phase.project_id
        ),
      ]);
    } else if (next_phase.status === "v čakanju") {
      await Promise.all([
        await updatePhase(current_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "zaključeno",
          end_date: new Date(),
          name: current_phase.name,
        }),
        updatePhase(next_phase.id, user.id, {
          project_id: current_phase.project_data.id,
          status: "v teku",
          start_date: new Date(),
          name: next_phase_name,
        }),
        updateProject(
          {
            napredek:
              current_phase.project_data.napredek > 4
                ? current_phase.project_data.napredek
                : 4,
            status: "zaključeno",
            end_date: new Date(),
            stanje:
              current_phase.project_data.napredek > 100
                ? current_phase.project_data.napredek
                : 100,
          },
          current_phase.project_id
        ),
      ]);
    } else {
      await updatePhase(current_phase.id, user.id, {
        project_id: current_phase.project_data.id,
        status: "zaključeno",
        end_date: new Date(),
        name: current_phase.name,
      });
    }
  }
  revalidatePath("/", "page");
};
