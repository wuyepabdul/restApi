import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import {
  deleteUserAction,
  listUsersAction,
} from "../../redux/actions/userActions";
import Meta from "../../components/Meta/Meta";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsersAction());
    } else {
      history.push("/login");
    }
  }, [history, dispatch, userInfo, successDelete]);

  //delete a user handler
  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure")) {
      // dispatch delete user action
      dispatch(deleteUserAction(userId));
    }
  };

  return (
    <div className="container">
      <Meta title="All Users" />
      <h1>Users</h1>
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <Link to={`mailto:${user.email}`}>{user.email}</Link>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {" "}
                  <Link to={`/admin/user/${user._id}/edit`}>
                    {" "}
                    <Button variant="info" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>{" "}
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
