import agent from "./agent";

const logSend = ({ title, method, message, error, coinCode, coinAddress }) => {
  let body = {
    title,
    method,
    message,
    error: Boolean(error),
    coinCode,
    coinAddress
  };

  console.log('body: ', body);

  agent.post("client-logs/create", body).then((res) => {

  }).catch((err) => {

  })
};

export default logSend;
