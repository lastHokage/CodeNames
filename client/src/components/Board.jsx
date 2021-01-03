const Board = ({ scores, currentTeam, words, handleClick }) => {
  return (
    <div className="container content-center">
      <div className=" flex flex-wrap justify-between mb-3 ">
        <div className=" bg-red-100 p-3">
          <h3 className="sm:text-lg">Team RED score</h3>
          <p className="font-bold sm:text-lg text-center">{scores.red}</p>
        </div>
        {currentTeam && (
          <div className={`bg-${currentTeam}-100 p-3`}>
            <h3 className="sm:text-lg">Current Player {currentTeam}</h3>
          </div>
        )}
        <div className=" bg-blue-100 p-3">
          <h3 className="sm:text-lg">Team BLUE score</h3>
          <p className="font-bold sm:text-lg text-center">{scores.blue}</p>
        </div>
      </div>
      <h3 className="text-center text-xl mb-3 sm:text-2xl">
        when ever you ready please click on the words to submit your choice
      </h3>
      <div className="w-full">
        <div className="flex justify-between flex-wrap">
          {words.map((word, index) => (
            <p
              className={
                word.colour
                  ? ` bg-${word.colour}-400 sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm `
                  : ` sm:m-2 sm:p-3 w-1/6 sm:text-base text-center m-1 mb-3 text-sm transition-all duration-500 bg-gray-100 hover:bg-gray-500 hover:text-white `
              }
              key={word.id}
              id={index}
              onClick={(e) => handleClick(e.target.id)}
            >
              {word.word}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
