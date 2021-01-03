const EndModal = ({ startNew, looser, player }) => {
  return (
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
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Game Over!
              </h3>
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Team <span className="text-red-500">{looser} </span>lost
              </h3>

              <p className="text-gray-500 py-3">
                Oh Noooo! {player} have clicked on the assassin card
              </p>
              <button
                className="bg-green-500 text-lg p-2 my-5 text-white rounded-md hover:bg-green-800"
                onClick={startNew}
              >
                start a new game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
