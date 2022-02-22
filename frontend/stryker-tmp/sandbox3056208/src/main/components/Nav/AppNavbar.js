// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});

  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }

  function retrieveNS() {
    return ns;
  }

  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}

stryNS_9fa48();

function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });

  function cover() {
    var c = cov.static;

    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }

  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}

function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();

  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }

      return true;
    }

    return false;
  }

  stryMutAct_9fa48 = isActive;
  return isActive(id);
}

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";
export default function AppNavbar({
  currentUser,
  systemInfo,
  doLogout,
  currentUrl = window.location.href
}) {
  if (stryMutAct_9fa48("59")) {
    {}
  } else {
    stryCov_9fa48("59");
    return <>
      {stryMutAct_9fa48("62") ? currentUrl.startsWith("http://localhost:3000") || currentUrl.startsWith("http://127.0.0.1:3000") || <AppNavbarLocalhost url={currentUrl} /> : stryMutAct_9fa48("61") ? false : stryMutAct_9fa48("60") ? true : (stryCov_9fa48("60", "61", "62"), (stryMutAct_9fa48("64") ? currentUrl.startsWith("http://localhost:3000") && currentUrl.startsWith("http://127.0.0.1:3000") : stryMutAct_9fa48("63") ? true : (stryCov_9fa48("63", "64"), currentUrl.startsWith(stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "http://localhost:3000")) || currentUrl.startsWith(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), "http://127.0.0.1:3000")))) && <AppNavbarLocalhost url={currentUrl} />)}
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <Nav className="me-auto">
            {stryMutAct_9fa48("69") ? systemInfo?.springH2ConsoleEnabled || <>
                  <Nav.Link href="/h2-console">H2Console</Nav.Link>
                </> : stryMutAct_9fa48("68") ? false : stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67", "68", "69"), (stryMutAct_9fa48("70") ? systemInfo.springH2ConsoleEnabled : (stryCov_9fa48("70"), systemInfo?.springH2ConsoleEnabled)) && <>
                  <Nav.Link href="/h2-console">H2Console</Nav.Link>
                </>)}
            {stryMutAct_9fa48("73") ? systemInfo?.showSwaggerUILink || <>
                  <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                </> : stryMutAct_9fa48("72") ? false : stryMutAct_9fa48("71") ? true : (stryCov_9fa48("71", "72", "73"), (stryMutAct_9fa48("74") ? systemInfo.showSwaggerUILink : (stryCov_9fa48("74"), systemInfo?.showSwaggerUILink)) && <>
                  <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                </>)}
          </Nav>

          <>
            {
              /* be sure that each NavDropdown has a unique id and data-testid  */
            }
          </>

          <Navbar.Collapse className="justify-content-between">
            <Nav className="mr-auto">
              {stryMutAct_9fa48("77") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75", "76", "77"), hasRole(currentUser, stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "ROLE_ADMIN")) && <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown>)}
            </Nav>

            <Nav className="mr-auto">
              {stryMutAct_9fa48("81") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown">
                    <NavDropdown.Item href="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item href="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("80") ? false : stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79", "80", "81"), hasRole(currentUser, stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "ROLE_USER")) && <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown">
                    <NavDropdown.Item href="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item href="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown>)}
            </Nav>

            <Nav className="mr-auto">
              {stryMutAct_9fa48("85") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="Students" id="appnavbar-students-dropdown" data-testid="appnavbar-students-dropdown">
                    <NavDropdown.Item href="/students/list" data-testid="appnavbar-students-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item href="/students/create" data-testid="appnavbar-students-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85"), hasRole(currentUser, stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), "ROLE_USER")) && <NavDropdown title="Students" id="appnavbar-students-dropdown" data-testid="appnavbar-students-dropdown">
                    <NavDropdown.Item href="/students/list" data-testid="appnavbar-students-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("89") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item href="/students/create" data-testid="appnavbar-students-create">Create</NavDropdown.Item> : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), hasRole(currentUser, stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "ROLE_ADMIN")) && <NavDropdown.Item href="/students/create" data-testid="appnavbar-students-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
            </Nav>

            <Nav className="mr-auto">
              {stryMutAct_9fa48("93") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="CollegiateSubreddits" id="appnavbar-collegiateSubreddits-dropdown" data-testid="appnavbar-collegiateSubreddits-dropdown">
                    <NavDropdown.Item href="/collegiateSubreddits/list" data-testid="appnavbar-collegiateSubreddits-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item href="/collegiateSubreddits/create" data-testid="appnavbar-collegiateSubreddits-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : (stryCov_9fa48("91", "92", "93"), hasRole(currentUser, stryMutAct_9fa48("94") ? "" : (stryCov_9fa48("94"), "ROLE_USER")) && <NavDropdown title="CollegiateSubreddits" id="appnavbar-collegiateSubreddits-dropdown" data-testid="appnavbar-collegiateSubreddits-dropdown">
                    <NavDropdown.Item href="/collegiateSubreddits/list" data-testid="appnavbar-collegiateSubreddits-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("97") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item href="/collegiateSubreddits/create" data-testid="appnavbar-collegiateSubreddits-create">Create</NavDropdown.Item> : stryMutAct_9fa48("96") ? false : stryMutAct_9fa48("95") ? true : (stryCov_9fa48("95", "96", "97"), hasRole(currentUser, stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "ROLE_ADMIN")) && <NavDropdown.Item href="/collegiateSubreddits/create" data-testid="appnavbar-collegiateSubreddits-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
            </Nav>

            <Nav className="mr-auto">
              {stryMutAct_9fa48("101") ? hasRole(currentUser, "ROLE_USER") || <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown">
                    <NavDropdown.Item href="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {hasRole(currentUser, "ROLE_ADMIN") && <NavDropdown.Item href="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>}
                  </NavDropdown> : stryMutAct_9fa48("100") ? false : stryMutAct_9fa48("99") ? true : (stryCov_9fa48("99", "100", "101"), hasRole(currentUser, stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), "ROLE_USER")) && <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown">
                    <NavDropdown.Item href="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {stryMutAct_9fa48("105") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown.Item href="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item> : stryMutAct_9fa48("104") ? false : stryMutAct_9fa48("103") ? true : (stryCov_9fa48("103", "104", "105"), hasRole(currentUser, stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "ROLE_ADMIN")) && <NavDropdown.Item href="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>)}
                  </NavDropdown>)}
            </Nav>

            <Nav className="ml-auto">
              {(stryMutAct_9fa48("109") ? currentUser || currentUser.loggedIn : stryMutAct_9fa48("108") ? false : stryMutAct_9fa48("107") ? true : (stryCov_9fa48("107", "108", "109"), currentUser && currentUser.loggedIn)) ? <>
                    <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                    <Button onClick={doLogout}>Log Out</Button>
                  </> : <Button href="/oauth2/authorization/google">Log In</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>;
  }
}