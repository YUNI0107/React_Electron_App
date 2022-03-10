function TicketContent() {
  return (
    <div className="flex-1 flex justify-center items-start flex-col">
      <h1 className="text-white text-xl font-bold mb-2">My Tempo Ticket</h1>
      <div className="bg-white w-full h-full">
        <div>
          <img
            src="https://images.unsplash.com/photo-1646764065682-af0952b842a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="img"
          />
        </div>

        <div className="p-4 text-left">
          <div className="mb-4">
            <h1 className="text-md mb-1 text-gray-500">Topic</h1>
            <input
              type="text"
              className="input-basic"
              placeholder="Type Your Study Topic"
            />
          </div>

          <div className="mb-4">
            <h1 className="text-md mb-1 text-gray-500">Ticket Number</h1>
            <input
              type="text"
              className="input-basic"
              placeholder="Type Your Ticket Number"
            />
          </div>

          <div className="flex items-center">
            <div>
              <h1 className="text-md mb-2 text-gray-500">Start Time</h1>
              <input type="date" className="input-basic" />
            </div>

            <h1 className="mx-4 pt-5">—</h1>

            <div>
              <h1 className="text-md mb-1 text-gray-500">End Time</h1>
              <input type="date" className="input-basic" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-indigo-500 bg-white w-full p-4">
        <button className="bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-5 rounded text-white font-semibold">
          Submit Your Plan
        </button>
      </div>
    </div>
  );
}

export default TicketContent;
