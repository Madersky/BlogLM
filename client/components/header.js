import Link from 'next/link';
import Image from 'next/image';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: 'Sign Up',
      href: '/auth/signup',
    },
    !currentUser && {
      label: 'Sign In',
      href: '/auth/signin',
    },
    currentUser && {
      label: 'Sign Out',
      href: '/auth/signout',
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  const loggedAs = [
    currentUser && (
      <Link href={`/profiles/${currentUser.id}`}>
        <a>{`Logged As: ${currentUser.email}`}</a>
      </Link>
    ),
  ];
  const settingsIcon = [
    currentUser && <li className="settings-icon"></li>,
  ];

  let element = null;
  if (currentUser) {
    element = [
      <Link href="/content/home">
        <a className="navbar-logo">Let's Meet</a>
      </Link>,
    ];
  } else {
    element = [
      <Link href="/">
        <a className="navbar-logo">Let's Meet</a>
      </Link>,
    ];
  }

  return (
    <nav className="navbar">
      <div className="logo"></div>
      {element}
      <div className="box-content">
        <ul className="list-navbar  ">
          <div className="header-user-avatar"></div>
          <li>{loggedAs}</li>
          {links}
          {settingsIcon}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
