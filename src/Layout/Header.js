import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/loginAction';
import { sendPostRequest } from '../axios';

function Header() {
    const expand = 'md';
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const userLoginData = useSelector(state => state.userData);
    const loginUserInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    const handleLogout = () => {

        const userData = { email: userLoginData.email };
        const url = "/ers/webLogout"
        sendPostRequest(url, userData)
            .then((data) => {
                console.log(data);
                if (data.code === "900") {
                } else if (data.code === "200") {
                    sessionStorage.clear();
                    dispatch(logout());
                }
            })
            .catch(error => console.error('Error:', error));
    };

    if (loginUserInfo){
        if(!loggedIn)
            dispatch(login(loginUserInfo));
    }

    return (
        <>

            <Navbar style={{zIndex:1800}} key={expand} expand={expand} className="bg-light shadow bg-body-tertiary mb-3" >
                <Container fluid>
                    <Navbar.Brand className='ms-3' href="/">ERS</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {loggedIn && (
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="#action1">영수증목록</Nav.Link>
                                    <Nav.Link href="#action2">리포트</Nav.Link>
                                    <Nav.Link href="#action2">계정과목 설정</Nav.Link>
                                    <Nav.Link href="#action2">영수증 휴지통</Nav.Link>
                                    <NavDropdown
                                        title="계정관리"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/userinfo">마이페이지</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            )}
                            {!loggedIn && (
                                <Nav className="justify-content-end flex-grow-1 pe-3">

                                    <NavDropdown
                                        title="로그인 하세요"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/login">로그인</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            )}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;