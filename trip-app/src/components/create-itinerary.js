import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import '../create-itinerary.css';
import axios from 'axios';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      contents: [
          {
              parts: [
                  {
                      text: `Create a personalized itinerary for a trip from  to ${city}, in the ${region} region of country ${country} with a ${budget} budget. I'm traveling ${companions=="Solo"?"":"with"} ${companions} . Please suggest accommodations, dining options and activities that are suitable for our budget. Make sure that you include the Google Maps links to all the hotels, resorts, and activity places that you are mentioning. Also provide the data in a key value pair format only. Like - Day1: some content, Day2: some content and so on. Also for each day I want you to provide Morning: some content, Afternoon: some content and Evening: some content format. Also first provide the itinerary in this format and do not provide any other data before or after this. The data must only be for day wise that's it`
                  }
              ]
          }
      ]
    };
    try {
      const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDDJApZR5HKhrkMFv989ZZU-9HpA51cxb8', requestBody);
      const itineraryText = response.data;
      navigate('/displayItinerary', { state: { itineraryText } });
    } catch (error) {
        console.error('Error fetching itinerary:', error);
    }
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
