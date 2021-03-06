import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userActions";
import Searchbox from "../Searchbox/Searchbox";
import { fade, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { ExitToApp, ListAlt } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  textColor: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    color: "white",

    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
  mobileTextColor: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    color: "black",

    "&:hover": {
      color: "black",
      textDecoration: "none",
    },
  },
  leftPadding: {
    paddingLeft: "3px",
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = ({ history }) => {
  // get cart items from store
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // get loggedIn user from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push("/login");
  };

  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo && !userInfo.isAdmin ? (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link href="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="logout"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>

            <Link
              href="#"
              onClick={logoutHandler}
              className={classes.mobileTextColor}
            >
              Logout
            </Link>
          </MenuItem>
        </>
      ) : userInfo && userInfo.isAdmin ? (
        <>
          <MenuItem>
            <IconButton
              aria-label="login"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
            <Link href="#" className={classes.mobileTextColor}>
              Admin
            </Link>
          </MenuItem>
          <hr />
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PersonIcon />
            </IconButton>

            <Link href="#" className={classes.mobileTextColor}>
              {userInfo.name}
            </Link>
          </MenuItem>

          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link href="/admin/userList" className={classes.mobileTextColor}>
              Users
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <MenuBookIcon />
            </IconButton>

            <Link href="/admin/productList" className={classes.mobileTextColor}>
              Products
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ListAlt />
            </IconButton>

            <Link href="/admin/orderList" className={classes.mobileTextColor}>
              Orders
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link onClick={logoutHandler} className={classes.mobileTextColor}>
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <MenuItem>
          <IconButton aria-label="login" aria-haspopup="true" color="inherit">
            <ExitToApp />
          </IconButton>

          <Link href="/login" className={classes.mobileTextColor}>
            SignIn
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <HomeIcon />
        </IconButton>

        <Link href="/" className={classes.mobileTextColor}>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Link href="/cart" className={classes.mobileTextColor}>
          Cart
        </Link>
      </MenuItem>

      {userInfo && !userInfo.isAdmin ? (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link href="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="logout"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>

            <Link
              href="#"
              onClick={logoutHandler}
              className={classes.mobileTextColor}
            >
              Logout
            </Link>
          </MenuItem>
        </>
      ) : userInfo && userInfo.isAdmin ? (
        <>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link href="#" className={classes.mobileTextColor}>
              Admin
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link href="/admin/userList" className={classes.mobileTextColor}>
              Users
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link href="/admin/productList" className={classes.mobileTextColor}>
              Products
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link href="/admin/orderList" className={classes.mobileTextColor}>
              Orders
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link onClick={logoutHandler} className={classes.mobileTextColor}>
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <MenuItem>
          <IconButton aria-label="login" aria-haspopup="true" color="inherit">
            <ExitToApp />
          </IconButton>

          <Link href="/login" className={classes.mobileTextColor}>
            SignIn
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Farmers-Online
          </Typography>
          <Searchbox />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
              <Typography>
                <Link className={classes.textColor} href="/">
                  Home
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography>
                <Link className={classes.textColor} href="#">
                  About
                </Link>
              </Typography>
            </MenuItem>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Typography>
                <Link className={classes.textColor} href="/cart">
                  Cart
                </Link>
              </Typography>
              <Badge
                className={classes.leftPadding}
                badgeContent={17}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userInfo ? (
                <AccountCircle />
              ) : (
                <MenuItem>
                  <Typography>
                    <Link className={classes.textColor} href="/login">
                      Signin
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default withRouter(Header);
