import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  // {
  //   index: 2,
  //   icon: <Phone />,
  // },
];



const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];



const MEMBERS = [
  { id: 0, img: faker.image.avatar(), name: faker.name.fullName() },
  { id: 1, img: faker.image.avatar(), name: faker.name.fullName() },
  { id: 2, img: faker.image.avatar(), name: faker.name.fullName() },
];

export {
  Profile_Menu,
  Nav_Buttons,
  Message_options,
  MEMBERS,
};
