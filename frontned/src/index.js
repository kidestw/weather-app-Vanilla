// frontend/src/index.js

import axios from "axios";

export default function Home() {
  const [ posts, setPosts ] = useState( [] );

  useEffect( () => {
    const fetchPosts = async () => {
      const res = await axios.get( "/posts" )
      console.log( res )
    }
    fetchPosts()
  }, [] )
  return (
    <>
      <Header />
      <div className='index'>
        <Posts />
        <Sidebar />
      </div>
    </>
  )
}

function renderPage() {
  // Check if user is logged in
  const token = window.sessionStorage.getItem('token');

  if (token) {
    // User is logged in, render app
    renderAppPage(); 
  } else {
    // No user, render login
    renderLoginPage();
  }
}

function renderAppPage() {
  window.location.href = 'index.html';
}

function renderLoginPage() {
  window.location.href = 'login.html'; 
}

renderPage();