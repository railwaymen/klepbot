import React from 'react';
import { Link, withRouter } from "react-router-dom";

export default function Navbar() {
  return (
    <nav id="app-navbar" className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">Klepbot</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <RouteLinkWrapper name="Cards" to="/" />
          <RouteLinkWrapper name="Email Templates" to="/email-templates">
            <RouteLinkWrapper name="Email templates" ico="fas fa-file-alt" to="/email-templates" />
            <RouteLinkWrapper name="New template" ico="fas fa-plus" to="/email-templates/new" />
          </RouteLinkWrapper>
          <RouteLinkWrapper name="Contacts" to="/contacts">
            <RouteLinkWrapper name="Contacts" ico="fas fa-user-friends" to="/contacts" />
            <RouteLinkWrapper name="New contact" ico="fas fa-plus" to="/contacts/new" />
            <RouteLinkWrapper name="Import" ico="fas fa-file-import" to="/contacts/new" />
            <RouteLinkWrapper name="Export" ico="fas fa-file-export" to="/contacts/new" />
          </RouteLinkWrapper>
          <RouteLinkWrapper name="Stats" to="/stats" />
          <RouteLinkWrapper name="Reports" to="/reports" />
          <RouteLinkWrapper name="Profile" to="/profile" />
        </ul>
      </div>
    </nav>
  )
}

const RouteLinkWrapper = withRouter(RouteWrapper);

function RouteWrapper({ to, name, ico, location: { pathname }, children }) {
  return (
    <li className="nav-item dropdown">
      <Link style={{display: 'flex', alignItems: 'center'}} className={`nav-link ${to === pathname ? 'active' : ''}`} to={to}>
        {ico ? <i className={ico}></i> : null}
        <span>{name}</span>
      </Link>
      { children ?
        <ul className="dropdown-menu">
          {children}
        </ul> : null
      }
    </li>
  )
};
