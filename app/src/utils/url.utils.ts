export const redirectToDomain = (domain: string, email: string) => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  const urlForRedirect = `${protocol}://${domain}.${clearHost}/sign-in?email=${email}`;
  if (window.location.href !== urlForRedirect) {
    window.location.href = urlForRedirect;
    return true;
  }
  return false;
};

export const redirectToMainPage = () => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;
  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    const urlWithoutSubdomain = location.toString().replace(location.host.split(".")[0] + ".", "");

    window.location.href = urlWithoutSubdomain;
  }
};

export const getRootDomainUrl = () => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${clearHost}/`;
};

export const getFullDomainUrl = (domain: string) => {
  const isLocalhost = location.host.includes("localhost");
  const countOfDomain = location.host.split(".").length;

  const isInvalidLocalhostUrl = isLocalhost && countOfDomain >= 2;
  const isInvalidExternalUrl = !isLocalhost && countOfDomain >= 3;

  let clearHost = location.host;

  if (isInvalidLocalhostUrl || isInvalidExternalUrl) {
    clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
  }
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${domain}.${clearHost}/`;
};
