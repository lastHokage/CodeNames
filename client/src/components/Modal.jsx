import Input from "./Input";
const Modal = ({
  getInput,
  gameRoom,
  getGameRoom,
  joinGameRoom,
  playerName,
  setPlayerName,
}) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Crreate a Game Room
              </h3>

              <div className="mt-2"></div>
              <p className="text-gray-500 py-3">
                If you like to create a game room and invite others please click
                on the create a game room
              </p>
              <form>
                <Input
                  value={playerName}
                  setValue={setPlayerName}
                  placeholder="enter your name"
                />
                <Input
                  value={gameRoom}
                  setValue={getInput}
                  placeholder="enter a room code if you like to join a game"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={getGameRoom}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Creat a game room
          </button>
          <button
            type="button"
            onClick={joinGameRoom}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Join a game room
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
