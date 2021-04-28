const app = require("./server/app");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const {
  joinRoom,
  createRandomeRoomSocket,
  gameRooms,
} = require("./controller/gameController");

const port = process.env.PORT || 4000;

const ADD_PLAYER = "ADD_PLAYER";
const GAME_STARTED = "GAME_STARTED";
const UPDATE_ROOM = "UPDATE_ROOM";
const UPDATE_TEAMS = "UPDATE_TEAMS";
const GEAME_BOARD = "GEAME_BOARD";
const SPAY_MASTER = "SPAY_MASTER";
const UPDATE_SPYMASTER = "UPDATE_SPYMASTER";

io.on("connection", (socket) => {
  console.log("socket connected");
  const { roomId } = socket.handshake.query;
  console.log({ roomId });
  socket.join(roomId);
  const room = gameRooms.filter((item) => item.roomId === roomId)[0];

  io.in(roomId).emit(UPDATE_ROOM, room);
  io.in(roomId).emit(GEAME_BOARD, room);

  socket.on(GAME_STARTED, (data) => {
    const { gameStarted } = data.body;
    room.gameStarted = true;
    console.log(room);
    io.in(roomId).emit(UPDATE_ROOM, room);
    io.in(roomId).emit(UPDATE_SPYMASTER, room);
    io.in(roomId).emit(SPAY_MASTER, room);
  });
  socket.on(UPDATE_SPYMASTER, (data) => {
    const { red, blue } = data.body;
    if (red && room.teams.red.includes(red)) {
      room.redTeamSpyMaster = red;
    } else if (blue && room.teams.blue.includes(blue)) {
      room.blueTeamSpyMaster = blue;
    }
    io.in(roomId).emit(UPDATE_SPYMASTER, room);
  });
  socket.on(SPAY_MASTER, (data) => {
    console.log(data);
    const {
      redCardsPosition,
      civiliansCardsPosition,
      blueCardsPosition,
      assassinCardPosition,
    } = room.positions;
    const solved = room.words.map((item) => Object.assign({}, item));
    const addRed = redCardsPosition.map(
      (item) => (solved[item].colour = "red")
    );
    const addblue = blueCardsPosition.map(
      (item) => (solved[item].colour = "blue")
    );
    const addCivilians = civiliansCardsPosition.map(
      (item) => (solved[item].colour = "yellow")
    );
    solved[assassinCardPosition].colur = "gray";
    room.solved = solved;
    io.in(roomId).emit(SPAY_MASTER, room);
  });

  socket.on(GEAME_BOARD, (data) => {
    const { position, player } = data.body;
    console.log({ position });
    const {
      redCardsPosition,
      civiliansCardsPosition,
      blueCardsPosition,
      assassinCardPosition,
    } = room.positions;
    const convertPosition = parseInt(position);

    if (redCardsPosition.includes(convertPosition)) {
      room.words[convertPosition].colour = "red";
    } else if (civiliansCardsPosition.includes(convertPosition)) {
      room.words[convertPosition].colour = "yellow";
    } else if (blueCardsPosition.includes(convertPosition)) {
      room.words[convertPosition].colour = "blue";
    } else if (assassinCardPosition === convertPosition) {
      room.words[convertPosition].colour = "gray";
      room.slecteAssassin = true;
    }

    if (room.teams.red.includes(player)) {
      room.currentTeam = "red";
      if (room.words[convertPosition].colour === "red") {
        room.scores.red += 1;
      }
    } else if (room.teams.blue.includes(player)) {
      room.currentTeam = "blue";
      if (room.words[convertPosition].colour === "blue") {
        room.scores.blue += 1;
      }
    }

    room.currentPlayer = player;

    io.in(roomId).emit(GEAME_BOARD, room);
    io.in(roomId).emit(SPAY_MASTER, room);
  });

  socket.on(UPDATE_TEAMS, (data) => {
    const { red, blue } = data.body;

    const isBelongToAnyTeams = (id) => {
      const all = [...room.teams.red, ...room.teams.blue];
      console.log({ all });
      const index = all.findIndex((item) => item === id);
      return index !== -1 ? false : true;
    };

    if (red && isBelongToAnyTeams(red)) {
      room.teams.red.push(red);
    }

    if (blue && isBelongToAnyTeams(blue)) {
      room.teams.blue.push(blue);
    }

    io.in(roomId).emit(UPDATE_TEAMS, room);
  });

  socket.on(ADD_PLAYER, (data) => {
    const dataTosend = joinRoom(roomId, data.body);
    io.in(roomId).emit(ADD_PLAYER, dataTosend);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    socket.leave(roomId);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => {
  console.log(`app is runnig on http://localhost:${port}`);
});
