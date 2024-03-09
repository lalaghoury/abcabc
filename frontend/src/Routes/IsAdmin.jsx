import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { Skeleton } from "antd";

export default function IsAdmin() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      const verifyToken = async () => {
        try {
          setLoading(true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${auth.token}`;
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify/admin"
          );
          setOk(response.data.success);
          setLoading(false);
        } catch (error) {
          console.error("Verification failed:", error);
          setLoading(false);
        }
      };
      verifyToken();
    }
  }, [auth?.token, navigate]);

  if (loading) return <Skeleton active />;

  if (!ok)
    setTimeout(() => {
      return <PageNotFound />;
    }, 3000);

  return ok;
}
