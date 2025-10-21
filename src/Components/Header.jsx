import {Link} from "react-router-dom"

function Header() {
  return (
    <div>
       <nav className="bg-gray-200 py-2 px-4 flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-color-black">Movies</h1>
            <p className="text-white text-1xl">Look</p>
            </div>
        <div className="justify-between space-x-4 text-lg ">
        <Link to="/"className="hover:text-blue-600">Movies</Link>
        <Link to="/Movies"className="hover:text-blue-600">About</Link>
         <Link to="/Favorites"className="hover:text-blue-600">Favorites</Link>
          {/* <Link to="/Contacts"className="hover:text-blue-600">Contacts</Link> */}
           
         </div>
      </nav>
    </div>
  )}
  export default Header;