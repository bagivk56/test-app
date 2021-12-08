
const imageUserQualifications = (initLevel) => {
  const level = initLevel || 0;

  if (level === 0) {
    return require("../assets/png/qualifications/no-qualifications.png");
  }
  if (level === 1) {
    return require("../assets/png/qualifications/spark.png");
  }
  if (level === 2) {
    return require("../assets/png/qualifications/flash.png");
  }
  if (level === 3) {
    return require("../assets/png/qualifications/power.png");
  }
  if (level === 4) {
    return require("../assets/png/qualifications/storm.png");
  }
  if (level === 5) {
    return require("../assets/png/qualifications/tesla.png");
  }
  if (level === 6) {
    return require("../assets/png/qualifications/alfa.png");
  }
}

export {
  imageUserQualifications
}
