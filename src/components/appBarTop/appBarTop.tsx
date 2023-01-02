import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import { AppBar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { appTabs } from '../../helpers/tabs';

export const AppBarTop = () => {
  const [value, setValue] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
    setValue(newValue);

    return event;
  };

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  return (
    <AppBar sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        {appTabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
    </AppBar>
  );
};
