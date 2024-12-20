
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckToken = (setLoading, setIsLoggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setIsLoggedIn(false);
      navigate('/login'); 
      return;
    }

   
    fetch('http://localhost:3000/auth/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setIsLoggedIn(true); 
        } else {
          setLoading(false);
          setIsLoggedIn(false);
          localStorage.removeItem('token'); 
          navigate('/login');
        }
      })
      .catch(() => {
        setLoading(false);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [setLoading, setIsLoggedIn, navigate]);
};

export default useCheckToken;
