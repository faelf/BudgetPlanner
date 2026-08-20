import './Header.css';

type HeaderProps = {
  openSidebar: () => void;
};

function Header({ openSidebar }: HeaderProps) {

  return (
    <header className='main-header'>

      <button className='header-btn' onClick={openSidebar}>
        <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
          <path d='M4 5h16'/>
          <path d='M4 12h16'/>
          <path d='M4 19h16'/>
        </svg>
      </button>

      <h1 className='header-logo'>Budget Planner</h1>

      <button className='header-btn'>
        <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
          <circle cx='12' cy='8' r='5'/>
          <path d='M20 21a8 8 0 0 0-16 0'/>
        </svg>
      </button>

    </header>
  )
}

export default Header