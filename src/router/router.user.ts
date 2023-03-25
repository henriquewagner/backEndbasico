import { Router } from "express";
import { randomUUID } from "node:crypto";
import { Database } from "../database";

const usuarioRoute = Router();

const database = new Database();

const table = "usuario";

usuarioRoute.get("/", (request, response) => {
  const user = database.select(table);
  response.json(user);
});

usuarioRoute.get("/:id", (request, response) => {
  const { id } = request.params;

  const result = database.select(table, id);

  // console.log(result, " - ", typeof result);

  if (result === undefined)
    response.status(400).json({ msg: "Usuário não encontrado!" });

  response.json(result);
});

// Parâmetro que esta vindo do CLIENTE - REQUEST
// Parâmetro que esta indo para o CLIENTE - RESPONSE

usuarioRoute.post("/", (request, response) => {
  const { nome, operacao, cep, cpf, endereco } = request.body;

  const usuario = {
    id: randomUUID(),
    nome,
    endereco,
    operacao,
    cep,
    cpf,
  };
///Esse const não vai deixar criar mais que um usuario com as mesmas informações
  const usuarioExist: any = database.select(table, usuario.id);

  if (usuarioExist === usuario)
    return response.status(400).json({ msg: "Usuário não encontrado!" });

  database.insert(table, usuario);

  response.status(201).json({ msg: "sucesso!" });
});

usuarioRoute.delete("/:id", (request, response) => {
  const { id } = request.params;

  const usuarioExist: any = database.select(table, id);

  // console.log(result, " - ", typeof result);

  if (usuarioExist === undefined)
    return response.status(400).json({ msg: "Usuário não encontrado!" });

  database.delete(table, id);

  response
    .status(202)
    .json({ msg: `Usuário ${usuarioExist.name} foi deletado do banco` });
});

usuarioRoute.put("/:id", (request, response) => {
  const { id } = request.params;
  const { nome, operacao, cep, cpf, endereco  } = request.body;

  const usuarioExist: any = database.select(table, id);
  if (usuarioExist === undefined)
    return response.status(400).json({ msg: "Usuário não encontrado!" });

  database.update(table, id, { name, id });

  response.status(201).json({ msg: `O ID: {${id}} foi alterado banco` });
});

export { usuarioRoute };
