const allScraped = require("../source-data/all-dtmb-scraped.json");
const data = require("../source-data/data.json");
const { writeFile } = require("fs/promises");

const fieldsToUpdate = {
  created_at: "projectCreationDate",
};

const fieldsToConvert = {
  created_at: "date",
};

async function main() {
  const scrappedProjects = allScraped.map((d) => d.fields);

  const mapped = data.map((project) => {
    const foundScrapped = scrappedProjects.find(
      (s) => s["new-slug"] === project.slug
    );

    if (!foundScrapped) {
      return project;
    }

    const toUpdate = { ...project };

    Object.keys(fieldsToUpdate).forEach((key) => {
      const newKey = fieldsToUpdate[key];
      const value = foundScrapped[key];
      const convert = fieldsToConvert[key];

      console.log(`${"*".repeat(20)}`);
      console.log(`/scripts/updateDataFromScrapped.js:32`);
      console.log(`${"*".repeat(20)}`);
      console.log("* convert = ", convert);
      console.log("*".repeat(60));

      if (value && convert === "date") {
        toUpdate[newKey] = new Date(value).getTime();
      }

      if (value && !convert) {
        toUpdate[newKey] = value;
      }
    });

    return toUpdate;
  });

  await writeFile(
    "./source-data/update-data.json",
    JSON.stringify(mapped, null, 2)
  );
}

main()
  .then((res) => {
    console.log("Updating script Done!");
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
