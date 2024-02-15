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

export const icons = {
  HomeIcon,
  CalendarIcon,
  PersonIcon,
  PhoneIcon,
  VerifyIcon,
  NotificationIcon,
};
