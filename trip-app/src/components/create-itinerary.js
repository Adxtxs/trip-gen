import React, { useState } from 'react';
import { TextField, Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import '../create-itinerary.css';

function TravelForm() {
  const [budget, setBudget] = useState('');
  const [companions, setCompanions] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');


  const handleBudgetChange = (budgetOption) => {
    setBudget(budgetOption);
  };

  const handleCompanionsChange = (companionsOption) => {
    setCompanions(companionsOption);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Budget:', budget);
    console.log('Travel Companions:', companions);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Plan Your Trip
      </Typography>

    <Typography variant="h6" component="h2" gutterBottom>
      Destination
    </Typography>

    <div className="dropdown-container">
      <CountryDropdown
        value={country}
        onChange={(val) => setCountry(val)}
        className="custom-dropdown"
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => setRegion(val)}
        className="custom-dropdown"
      />
      <div>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="custom-dropdown"
        />
      </div>

    </div>

      <Typography variant="h6" component="h2" gutterBottom>
        Date Range
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
        </DemoContainer>
      </LocalizationProvider>


      {/* Budget Selection */}
      <Typography variant="h6" component="h2" gutterBottom>
        Budget
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {['Cheap', 'Moderate', 'Luxury'].map((option) => (
          <Grid item xs={4} key={option}>
            <Card
              onClick={() => handleBudgetChange(option.toLowerCase())}
              style={{
                backgroundColor: budget === option.toLowerCase() ? '#007bff' : '#f4f4f4',
                color: budget === option.toLowerCase() ? 'white' : '#333',
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  {option}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Travel Companions Selection */}
      <Typography variant="h6" component="h2" gutterBottom style={{ marginTop: '20px' }}>
        Who do you plan on traveling with?
      </Typography>
      <Grid container spacing={2} justifyContent="space-between">
        {['Solo', 'Couple', 'Family', 'Friends Group'].map((option) => (
          <Grid item xs={3} key={option}>
            <Card
              onClick={() => handleCompanionsChange(option.toLowerCase())}
              style={{
                backgroundColor: companions === option.toLowerCase() ? '#007bff' : '#f4f4f4',
                color: companions === option.toLowerCase() ? 'white' : '#333',
                cursor: 'pointer',
              }}
            >
              <CardContent>
                <Typography variant="body1" align="center">
                  {option}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Submit Button */}
      <Box mt={4} textAlign="center">
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Submit
        </button>
      </Box>
    </form>
  );
}

export default TravelForm;
