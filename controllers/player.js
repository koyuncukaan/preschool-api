const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const Player = require("../models/player");

const createPlayer = async (req, res) => {
  const player = await Player.create(req.body);
  res.status(StatusCodes.CREATED).json({ player });
};

const getAllPlayers = async (req, res) => {
  const players = await Player.find({});
  //TODO: type checking relook
  res.status(StatusCodes.OK).json(players);
};

const getPlayer = async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOne({ _id: playerID });
  if (!player) {
    throw new CustomError.NotFoundError(`No player with id : ${playerID}`);
  }

  res.status(StatusCodes.OK).json({ player });
};

const deletePlayer = async (req, res, next) => {
  const { id: playerID } = req.params;
  const player = await Player.findOneAndDelete({ _id: playerID });
  if (!player) {
    throw new CustomError.NotFoundError(`No player with id : ${playerID}`);
  }

  res.status(StatusCodes.OK).json({ player });
};

const updatePlayer = async (req, res, next) => {
  const { id: playerID } = req.params;

  const player = await Player.findOneAndUpdate({ _id: playerID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!player) {
    throw new CustomError.NotFoundError(`No player with id : ${playerID}`);
  }

  res.status(StatusCodes.OK).json({ player });
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
};
