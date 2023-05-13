import gameSchema from "../schemas/game.schema.js";

export async function gameIsValid(req, res, next) {
  try {
    const game = req.body;
    const { error } = gameSchema.validate(game);

    if (error) return res.sendStatus(400);

    req.game = game;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
