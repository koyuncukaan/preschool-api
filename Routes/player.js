const express = require("express");
const router = express.Router();

const {
  createPlayer,
  getAllPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
} = require("../controllers/player");

router.route("/").get(getAllPlayers).post(createPlayer);
router.route("/:id").get(getPlayer).delete(deletePlayer).patch(updatePlayer);

module.exports = router;
