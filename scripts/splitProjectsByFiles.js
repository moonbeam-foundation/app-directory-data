const projectArr = require("../source-data/update-data.json");
const { mkdir, writeFile } = require("fs/promises");

async function main() {
  for (const project of projectArr) {
    const projectPath = `./projects/${project.slug}`;
    const path = `${projectPath}/${project.slug}.json`;
    await mkdir(projectPath, { recursive: true });

    // ! currently it is overwriting the file, later we will need to change that when data in files will have already new fields !!!!!
    await writeFile(path, JSON.stringify(project, null, 2));
  }
}

main()
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
