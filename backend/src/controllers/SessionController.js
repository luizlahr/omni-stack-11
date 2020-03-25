const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection("ongs")
      .where("id", id)
      .select("*")
      .first();

    if (!ong) {
      return response.status(401).json({ error: "acesso negado" });
    }

    return response.json(ong);
  }
};
