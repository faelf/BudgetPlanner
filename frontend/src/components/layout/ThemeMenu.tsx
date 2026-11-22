import { useState } from 'react';

type Theme = 'light' | 'dark';

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.bsTheme === 'dark' ? 'dark' : 'light';
}

interface ThemeMenuProps {
  button?: boolean;
  menuItem?: boolean;
}

export default function ThemeMenu({ button = false, menuItem = false }: ThemeMenuProps) {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  function selectTheme(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.bsTheme = next;

    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable: the theme still applies for this session
    }
  }

  const themeOptions = (
    <div className='menu'>
      <button className={`menu-item ${theme === 'light' ? 'selected' : ''}`} type='button' onClick={() => selectTheme('light')}>
        <i className='bi bi-brightness-high-fill'></i>
        <div className='menu-item-content'>
          Light
          <small className='menu-item-description'>White theme</small>
        </div>
        <i className='menu-item-check bi bi-check'></i>
      </button>
      <button className={`menu-item ${theme === 'dark' ? 'selected' : ''}`} type='button' onClick={() => selectTheme('dark')}>
        <i className='bi bi-moon-stars-fill'></i>
        <div className='menu-item-content'>
          Dark
          <small className='menu-item-description'>Black theme</small>
        </div>
        <i className='menu-item-check bi bi-check'></i>
      </button>
    </div>
  );

  if (button === true) {
    return (<>
      <button type='button' className='theme-inverse btn-text btn-sm rounded-pill' data-bs-toggle='menu' data-bs-placement='bottom' aria-expanded='false'>
        <i className='bi bi-palette-fill'></i>
        <span>Change Theme</span>
      </button>
      {themeOptions}
    </>)
  }

  if (menuItem === true) {
    return (
      <div className='submenu'>
        <button className='menu-item' type='button'>
          <i className='bi bi-palette-fill'></i>
          <span className='menu-item-content'> Theme
            <small className='menu-item-description'>Change between light and dark</small>
          </span>
        </button>
        {themeOptions}
      </div>
    )
  }
}