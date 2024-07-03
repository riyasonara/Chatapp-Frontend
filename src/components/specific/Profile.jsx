/* eslint-disable react/prop-types */
import {
  CalendarMonth as CalendarIcon,
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import { transformImage } from "../../lib/features.js";

const Profile = ({user}) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
      src={transformImage( user.avatar?.url)}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard text={user.bio} heading={"Bio"} />
      <ProfileCard
        text={user?.username}
        heading={"Username"}
        Icon={<UsernameIcon />}
      />
      <ProfileCard
        text={"Name"}
        heading={user?.name}
        Icon={<FaceIcon />}
      />
      <ProfileCard
        text={"Joined"}
        heading={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
