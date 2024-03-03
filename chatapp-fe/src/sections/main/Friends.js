import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchfriendRequests,
  FetchUsers,
} from "../../Redux/slices/app";
import { UserComponent } from "../../components/friend/Friends";
import { FriendRequestComponent } from "../../components/friend/FriendRequestComponent";
import { FriendComponent } from "../../components/friend/FriendComponent";
import { useFriend } from "../../hooks/useFriend";
import { LoadingScreen } from "../../components/LoadingScreen";
/**
 * friends component show request make friend from other user
 * @param {*} {open, handleClose}
 * @returns
 */
const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const hanldeChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 1, }}
    >
      {/* <DialogTitle>{"Friends"}</DialogTitle> */}
      <Stack p={0.5} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={hanldeChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent sx={{height :"700px", overflow:"scroll"}}>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0:
                  return <UserList />;
                case 1:
                  return <FriendList handleClose={handleClose} />;
                case 2:
                  return <RequestFriendList />;
                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default Friends;

/**
 * show list user
 * @returns
 */
const UserList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(FetchUsers());
    setLoading(false);
  }, []);

  const { users } = useSelector((state) => state.app);

  if (loading) return <LoadingScreen />;
  return (
    <>
      {users &&
        users.map((element, index) => {
          return <UserComponent key={element.id} {...element} />;
        })}
    </>
  );
};

/**
 * show list friend
 * @returns
 */
const FriendList = ({ handleClose }) => {
  const { getFriends, friendLoading } = useFriend();
  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    getFriends();
  }, []);
  if (friendLoading) return <LoadingScreen />;
  return (
    <>
      {friends &&
        friends.map((element, index) => {
          return (
            <FriendComponent
              key={element.id}
              {...element}
              handleClose={handleClose}
            />
          );
        })}
    </>
  );
};

/**
 * show list request friend
 * @returns
 */
const RequestFriendList = () => {
  const { getFriendRequests, friendRequestLoading } = useFriend();
  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    getFriendRequests();
  }, []);
  if (friendRequestLoading) return <LoadingScreen />;
  return (
    <>
      {friendRequests &&
        friendRequests.map((element, index) => {
          return (
            <FriendRequestComponent
              key={element.id}
              {...element}
              id={element.id}
            />
          );
        })}
    </>
  );
};
