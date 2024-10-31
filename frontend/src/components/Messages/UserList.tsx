const UserList = () => {
  return (
    <div className="flex flex-col gap-6">
          <div className="flex flex-col p-6 cursor-pointer gap-2 pb-0">
            <span>User 1</span>
            <p className=" text-sm text-gray-400">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
          {/* User 2 Block */}
          <div className="flex flex-col p-6 cursor-pointer gap-2 pb-0">
            <span>User 2</span>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
          {/* User 3 Block */}
          <div className="flex flex-col p-6 cursor-pointer gap-2 pb-0">
            <span>User 3</span>
            <p className=" text-sm text-gray-400">
              Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
  )
}

export default UserList