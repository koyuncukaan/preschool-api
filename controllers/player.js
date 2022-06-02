const { createCustomError } = require("../errors/custom-error");

const Player = require("../models/player");

const createPlayer = async (req, res) => {
  const player = await Player.create(req.body);
  res.status(201).json({ player });
};

const getAllPlayers = async (req, res) => {
  const players = await Player.find({});
  res.status(200).json({ players });
};

const getPlayer = async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOne({ _id: playerID });
  if (!player) {
    return next(createCustomError(`No player with id : ${playerID}`, 404));
  }

  res.status(200).json({ player });
};

const deletePlayer = async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOneAndDelete({ _id: playerID });
  if (!player) {
    return next(createCustomError(`No player with id : ${playerID}`, 404));
  }

  res.status(200).json({ player });
};

const updatePlayer = async (req, res, next) => {
  const { id: playerID } = req.params;

  const player = await Player.findOneAndUpdate({ _id: playerID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!player) {
    return next(createCustomError(`No player with id : ${playerID}`, 404));
  }

  res.status(200).json({ player });
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
};
