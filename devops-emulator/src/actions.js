const { promisify } = require("util");
var fs = require("fs");
const portastic = require("portastic");
const path = require("path");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
var exec = require("child_process").exec;

function copyFolderSync(from, to) {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

const getFreePorts = async () => {
  options = {
    min: 41000,
    max: 42000,
  };
  var result = await portastic.find(options);
  var frontendPort = result[Math.floor(Math.random() * result.length - 2)];
  var backendPort = result[result.indexOf(frontendPort) + 1];

  return { frontendPort, backendPort };
};

const generateComposerFile = async (domain, ports) => {
  console.log("Starting generateComposerFile", domain);

  const { frontendPort, backendPort } = ports;
  const domainNameWithPort = domain + frontendPort;

  const frontendPortInTemplate = 22222;
  const backendPortInTemplate = 11111;

  const templateFolder = path.join(
    __dirname,
    "../../customer-services//composer//template-for-copy"
  );

  const composeFolder = path.join(
    __dirname,
    `../../customer-services//composer`,
    domainNameWithPort
  );
  copyFolderSync(templateFolder, composeFolder);

  const buildCmdPath = path.join(composeFolder, "build.cmd");
  let buildData = await readFileAsync(buildCmdPath, {
    encoding: "utf-8",
  });
  buildData = buildData.split("domain").join(domainNameWithPort);
  await writeFileAsync(buildCmdPath, buildData, "utf8");

  const upCmdPath = path.join(composeFolder, "up.cmd");
  let upCmdData = await readFileAsync(upCmdPath, {
    encoding: "utf-8",
  });
  upCmdData = upCmdData.split("domain").join(domainNameWithPort);
  await writeFileAsync(upCmdPath, upCmdData, "utf8");

  let composePath = path.join(composeFolder, "docker-compose.yml");
  let composeData = await readFileAsync(composePath, {
    encoding: "utf-8",
  });
  composeData = composeData.split("domain").join(domainNameWithPort);
  composeData = composeData.split(frontendPortInTemplate).join(frontendPort);
  composeData = composeData.split(backendPortInTemplate).join(backendPort);
  await writeFileAsync(composePath, composeData, "utf8");
  console.log("End generateComposerFile", domain);
  return {
    composePath,
    upCmdPath,
    buildCmdPath,
    buildCmdData: buildData,
    composeFolder,
  };
};
const runCmdFile = async function (path, command) {
  console.log("\n\r".repeat(16));
  console.log("path", path);
  console.log("command", command);
  exec(
    `cd ${path} && ${command}`,
    { cmd: path },
    function (error, stdout, stderr) {
      console.log("stdout");
      console.log(stdout, error, stderr);
    }
  );
};
const createNewDomain = async function (req, res) {
  const { domain } = req.params;
  if (!/^[a-z]+$/.test(domain)) {
    res.status(200).json({ domain, error: 'problemWithDomain' });
    return domain
  }
  const ports = await getFreePorts();

  const { composePath, upCmdPath, buildCmdData, composeFolder } =
    await generateComposerFile(domain, ports);
  await runCmdFile(composeFolder, buildCmdData);

  const frontendUrl = `http://localhost:${ports.frontendPort}/`;
  res.status(200).json({ domain, frontendUrl });
};

const initRouts = (app) => {
  app.get("/create-new-domain/:domain", createNewDomain);
  app.get("/", async function (req, res) {
    res.status(200).json({ 
      message: "Server is up" , 
      exampleOfUrl: `/create-new-domain/:domain`});
  });
};

module.exports = initRouts;
