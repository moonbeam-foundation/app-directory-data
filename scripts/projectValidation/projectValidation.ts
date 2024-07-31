import { glob } from "glob";
import { validateProject } from "./projectSchema";

async function main() {
  console.log(
    `************************************ Validate Projects! ************************************`
  );
  const paths = await glob(`${process.env.PWD}/projects/**/*.json`, {
    ignore: "**/node_modules/**",
  });

  console.log(`Found ${paths.length} projects`);

  for (const path of paths) {
    const { default: project } = await import(path, {
      assert: { type: "json" },
    });
    console.log(`Validating project ${project.id}...`);

    const validationResult = validateProject(project);

    if (!validationResult.success) {
      console.error(
        `Validation failed for project "${project.id}" with errors:`
      );
      console.error(validationResult.error);
      throw new Error(`Project validation failed. Project ID: ${project.id}`);
    }
  }
}

main()
  .then(() => console.log("done"))
  .catch(console.error)
  .finally(() => process.exit(0));
