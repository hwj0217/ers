import React, { useState } from "react"

import ersLogo from "../assets/img/ers-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/loginAction';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Button, FormControl, FormControlLabel, Grid, InputBase, InputLabel, Switch, alpha, styled } from "@mui/material";

import AdbIcon from '@mui/icons-material/Adb';
import PasswordInputForm from "../component/joinComponent/PasswordInputForm";
import PrivacyStatement from "../component/joinComponent/PrivacyStatement";
import TermsOfService from "../component/joinComponent/TermsOfService";
const drawerWidth = 240;
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #999999',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UserInfo = () => {
    const dispatch = useDispatch();
    const userLoginData = useSelector(state => state.userData);
    const [hovered, setHovered] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [name, setName] = useState(userLoginData.name ? userLoginData : '');
    const [hpNum, setHpNum] = useState(userLoginData.hp_number ? userLoginData.hp_number : '');
    const [bizNo, setBizNo] = useState(userLoginData.bizNo ? userLoginData.bizNo : '');
    const [password, setPassword] = useState('');

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handleHpNumChange = (e) => {
        const newHpNum = e.target.value;
        setHpNum(newHpNum);
    };

    const handleBizNoChange = (e) => {
        const newBizNo = e.target.value;
        setBizNo(newBizNo);
    };

    const handleToggleChange = (e) => {
        const newChecked = e.target.checked;
        setToggle(newChecked);
        console.log(newChecked)
    };

    const saveChanges = () => {
        const userData = { id: userLoginData.id, name: name, hp_number: hpNum, biz_no: bizNo };

        fetch('http://localhost:8080/ers/userInfoSaveWeb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.code === "900") {
                } else if (data.code === "200") {
                    dispatch(login(data.member));
                    sessionStorage.setItem("loginInfo", JSON.stringify(data.member));
                }
            })
            .catch(error => console.error('Error:', error));
    };
    const savePasswordChanges = () => {
        const userData = { email: userLoginData.email, new_password: password };

        fetch('http://localhost:8080/ers/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.code === "900") {
                } else if (data.code === "200") {
                }
            })
            .catch(error => console.error('Error:', error));
    };
    return (
        <div className="">
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <AdbIcon sx={{ md: 'flex', mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ERS
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText
                                    sx={{ my: 0 }}
                                    primary="계정 관리"
                                    primaryTypographyProps={{
                                        fontSize: 20,
                                        textAlign: 'center',
                                        fontWeight: 'medium',
                                        marginTop: "5px",
                                        letterSpacing: 0,
                                    }}
                                />
                            </ListItem>
                            <Divider />
                            <ListItemButton
                                selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="프로필 설정" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}
                            >
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="비밀번호 변경" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folder">
                            <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}
                            >
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="이용약관" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3)}
                            >
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="개인정보보호정책" />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedIndex === 4}
                                onClick={(event) => handleListItemClick(event, 4)}
                            >
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="라이센스" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Drawer>
                {selectedIndex === 0 && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <div>
                                <FormControl variant="standard" sx={{ width: "90%" }}>
                                    <InputLabel shrink htmlFor="name">
                                        이름
                                    </InputLabel>
                                    <BootstrapInput placeholder="이름을 입력하세요." defaultValue={userLoginData.name} id="name" onChange={handleNameChange} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl variant="standard" sx={{ width: "90%", marginTop: "15px" }}>
                                    <InputLabel shrink htmlFor="hp_number">
                                        전화번호
                                    </InputLabel>
                                    <BootstrapInput placeholder="전화번호를 입력하세요." defaultValue={userLoginData.hp_number} id="hp_number" onChange={handleHpNumChange} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControlLabel
                                    value="start"
                                    control={<Switch color="primary" />}
                                    label="사업자 여부"
                                    labelPlacement="start"
                                    sx={{ marginLeft: '0px', marginTop: '10px' }}
                                    onChange={handleToggleChange}
                                />
                            </div>
                            {toggle && <div>
                                <FormControl variant="standard" sx={{ width: "90%", marginTop: "15px" }}>
                                    <InputLabel shrink htmlFor="biz_no">
                                        사업자번호
                                    </InputLabel>
                                    <BootstrapInput placeholder="사업자번호를 입력하세요." defaultValue={userLoginData.bizNo} id="biz_no" onChange={handleBizNoChange} />
                                </FormControl>
                            </div>}
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                style={{
                                    width: "200px", height: "200px", borderRadius: "200px",
                                    backgroundImage: `url(${ersLogo})`, backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center", backgroundColor: hovered ? "gray" : "white",
                                    margin: "auto"
                                }}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                            >
                                {hovered && <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>이미지 변경</span>}
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Grid>
                    </Grid>
                    <Toolbar />
                    <Divider />
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button onClick={saveChanges} sx={{ padding: "10px 50px", margin: "20px" }} variant="contained">저장</Button>
                    </Grid>
                </Box>}
                {selectedIndex === 1 && <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    <Grid container spacing={3} sx={{ margin: "10px auto 0px auto", backgroundColor: "lightgray" }}>
                        <ListItemText sx={{ textAlign: "center" }}>비밀번호 변경</ListItemText>
                    </Grid>
                    <Grid container spacing={3} sx={{ margin: "0px auto", backgroundColor: "lightgray" }}>
                        <ListItemText sx={{ textAlign: "center" }}>{userLoginData.email}</ListItemText>
                    </Grid>
                    <Grid container spacing={3} sx={{ margin: "20px auto" }}>
                        <PasswordInputForm selectedIndex={selectedIndex} setPassword={setPassword} password={password} />
                    </Grid>
                    <Toolbar />
                    <Divider />
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button onClick={savePasswordChanges} sx={{ padding: "10px 50px", margin: "20px" }} variant="contained">저장</Button>
                    </Grid>
                </Box>}
                {selectedIndex === 2 && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                     <TermsOfService/>
                </Box>}
                {selectedIndex === 3 && <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                     <PrivacyStatement/>
                </Box>}
            </Box>
        </div>
    )
}

export default UserInfo