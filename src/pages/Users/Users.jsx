import React,{useEffect,useState} from 'react'

function Users() {
              const API_URL = 
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://new-movie-app.onrender.com";
        const [users, setUsers] = useState([]);
         const [activetab, setActivetab] = useState("users");
  
    useEffect(() => {
      fetch(`${API_URL}/api/admin/users`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error('Error fetching users:', err));
    }, []);
        const handleStatusChange = async (userId, value) => {
        const newStatus = value === 'admin';
    
        try {
          const response = await fetch(`${API_URL}/api/users/${userId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_admin: newStatus }),
          });
    
          if (response.ok) {
            // Update local state so table reflects change immediately
            const updateList = activetab === "users" ? users.map(u => u.id === userId ? { ...u, is_admin: newStatus } : u)
                                                    : admin.map(u => u.id === userId ? { ...u, is_admin: newStatus } : u);
            activetab === "users" ? setUsers(updateList) : setAdmin(updateList);
          } else {
            console.error('Failed to update status');
          }
        } catch (err) {
          console.error(err);
        }
      };
  return (
        <div className="overflow-x-auto px-4">
          <table className='recent-table w-full text-center'>
                            <thead className='bg-gray-100'>
                                <tr>
                                <th>UserID</th>
                                <th>Time</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Account type</th>
                                </tr>
                            </thead>
                                    <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{new Date(user.created_at).toLocaleString()}</td>
                                        <td>{user.username}</td>
                                        <td>{user.phonenumber}</td>
                                        <td>{user.email}</td>
                                        <td>{user.is_admin ? 'admin' : 'user'}</td>
                                                          <td>
                                    <select
                                      className='border text-center'
                                      value={user.is_admin ? 'admin' : 'user'}
                                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                    >
                                      <option value="">status</option>
                                      <option value="admin">admin</option>
                                      <option value="user">user</option>
                                    </select>
                                  </td>
                                        </tr>
                                    ))}
                                    </tbody>

                        </table>
    </div>
  )
}

export default Users