// install a JRE upfront (unless a system Java 17+ exists), so the first `pmd` run doesn't print install logs to stdout
if (process.env["PMD_BIN_SKIP_JAVA_DOWNLOAD"] === "true") {
  console.log("skipped downloading Java");
} else {
  const { JavaCaller } = require("java-caller");
  new JavaCaller({ minimumJavaVersion: 17, javaType: "jre" }).manageJavaInstall().catch((err) => {
    console.log(err);
    process.exit(1);
  });
}
