import { Job, Pipeline } from "https://deno.land/x/cicada@v0.1.32/lib.ts";
import packageJson from "../package.json" assert { type: "json" };

const PACKAGE_MANAGER = packageJson.packageManager?.replace(/@.*/, "")

const job = new Job({
  name: "web ci",
  image: "node:18-alpine",
  steps: [
    {
      name: "install dependencies",
      run: `yarn global add ${packageJson.packageManager} && ${PACKAGE_MANAGER} install`,
    },
    {
      name: "unit test",
      run: `${PACKAGE_MANAGER} test`,
    }
  ]
});

export default new Pipeline([job]);
