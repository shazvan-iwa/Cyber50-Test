import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { type User } from "../types/auth";

import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get<User>("/users/me");
        setUser(res.data);
      } catch {
        navigate("/login"); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Dashboard" className="w-25rem">
        {user && (
          <>
            <h3>Welcome, {user.first_name} {user.last_name}</h3>
            <p>Email: {user.email}</p>
          </>
        )}

        
      </Card>
    </div>
  );
};

export default Dashboard;