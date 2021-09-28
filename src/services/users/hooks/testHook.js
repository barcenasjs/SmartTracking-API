module.exports = () => {
  return (context) => {
    const id = context.id;
    const query = context.params.query; //query
    const data = context.data; // data que vviene del query
    const userSessionData = context.params.user; // datos de la sessión actual
    const haerders = context.params.headers;
    //Obetener servicios

    const app = context.app; // toda laAPP
    const service = context.app.service("write").create({ position: "hola" });
    const method = context.method; // me trae el método que se está ejecutando
    context.result = { ...context.result, message: "Primer hook" };
    return context;
  };
};
