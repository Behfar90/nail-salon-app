import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="home" size={size} color={color} />;

const CalendarIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="calendar" size={size} color={color} />;

const PersonIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="person" size={size} color={color} />;

const PhoneIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="phone" size={size} color={color} />;

const VerifyIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="verified-user" size={size} color={color} />;

const NotificationIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="notifications" size={size} color={color} />;

const BackCircleIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="arrow-back-circle-outline" size={size} color={color} />;

const ChevronBackIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="chevron-back" size={size} color={color} />;

const ChevronForwardIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="chevron-forward" size={size} color={color} />;

const TelIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="phone" size={size} color={color} />;

const MemberSinceIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="card-membership" size={size} color={color} />;

const ExpandIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="expand-more" size={size} color={color} />;

const CollapseIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <MaterialIcons name="expand-less" size={size} color={color} />;

const CloseCircleIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="close-circle" size={size} color={color} />;

const UserIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="person" size={size} color={color} />;

const AddCircleIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => <Ionicons name="add-circle" size={size} color={color} />;

const MailIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialIcons name="mail" size={size} color={color} />
);

const TitleIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialIcons name="title" size={size} color={color} />
);

const LogoutIcon = ({ size, color }: { size: number; color: string }) => (
  <MaterialIcons name="logout" size={size} color={color} />
);

export const icons = {
  HomeIcon,
  CalendarIcon,
  PersonIcon,
  PhoneIcon,
  VerifyIcon,
  NotificationIcon,
  BackCircleIcon,
  ChevronBackIcon,
  ChevronForwardIcon,
  TelIcon,
  MemberSinceIcon,
  ExpandIcon,
  CollapseIcon,
  CloseCircleIcon,
  UserIcon,
  AddCircleIcon,
  MailIcon,
  TitleIcon,
  LogoutIcon,
};
