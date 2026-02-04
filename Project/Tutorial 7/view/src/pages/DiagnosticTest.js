import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const StyledContainer = styled(Container)({
  marginTop: '50px'
});

const ResultBox = styled(Box)({
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '12px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  maxHeight: '400px',
  overflow: 'auto'
});

function DiagnosticTest() {
  const [apiUrl, setApiUrl] = useState('https://us-central1-todolist-fc678shd.cloudfunctions.net/api');
  const [results, setResults] = useState('');
  const [testing, setTesting] = useState(false);

  const addResult = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    setResults(prev => `${prev}\n[${timestamp}] ${prefix} ${message}`);
  };

  const clearResults = () => {
    setResults('');
  };

  const testBasicConnection = async () => {
    setTesting(true);
    clearResults();
    
    addResult('=== STARTING BASIC CONNECTION TEST ===');
    addResult(`Testing API URL: ${apiUrl}`);
    
    try {
      addResult('Attempting to fetch /todos endpoint...');
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      addResult(`Response Status: ${response.status} ${response.statusText}`, 
                response.ok ? 'success' : 'error');
      
      const data = await response.json();
      addResult(`Response Body: ${JSON.stringify(data, null, 2)}`);
      
      if (response.status === 403 || response.status === 401) {
        addResult('Got 401/403 - This is GOOD! It means the API is working, just needs authentication', 'success');
      } else if (response.ok) {
        addResult('API is working!', 'success');
      }
      
    } catch (error) {
      addResult(`Connection Error: ${error.message}`, 'error');
      addResult('This likely means:', 'error');
      addResult('1. Firebase Functions URL is wrong', 'error');
      addResult('2. Firebase Functions are not deployed', 'error');
      addResult('3. CORS is not configured on backend', 'error');
    }
    
    setTesting(false);
  };

  const testSignup = async () => {
    setTesting(true);
    clearResults();
    
    addResult('=== TESTING SIGNUP ENDPOINT ===');
    
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '1234567890',
      country: 'Test Country',
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'testpassword123',
      confirmPassword: 'testpassword123'
    };
    
    addResult(`Test user email: ${testUser.email}`);
    
    try {
      addResult('Sending signup request...');
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testUser)
      });
      
      addResult(`Response Status: ${response.status} ${response.statusText}`, 
                response.ok ? 'success' : 'error');
      
      const data = await response.json();
      addResult(`Response Body: ${JSON.stringify(data, null, 2)}`);
      
      if (response.ok && data.token) {
        addResult('✅ SIGNUP WORKS! Token received!', 'success');
        addResult(`Save this for login test: ${testUser.email} / testpassword123`);
      } else {
        addResult('Signup failed - check response above', 'error');
      }
      
    } catch (error) {
      addResult(`Signup Error: ${error.message}`, 'error');
    }
    
    setTesting(false);
  };

  const testLogin = async () => {
    setTesting(true);
    clearResults();
    
    addResult('=== TESTING LOGIN ENDPOINT ===');
    addResult('NOTE: You need to have signed up first!');
    addResult('Enter email/password from a previous signup');
    
    const email = prompt('Enter email:');
    const password = prompt('Enter password:');
    
    if (!email || !password) {
      addResult('Cancelled', 'error');
      setTesting(false);
      return;
    }
    
    const credentials = { email, password };
    
    try {
      addResult('Sending login request...');
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      addResult(`Response Status: ${response.status} ${response.statusText}`, 
                response.ok ? 'success' : 'error');
      
      const data = await response.json();
      addResult(`Response Body: ${JSON.stringify(data, null, 2)}`);
      
      if (response.ok && data.token) {
        addResult('✅ LOGIN WORKS! Token received!', 'success');
      } else {
        addResult('Login failed - check credentials or response above', 'error');
      }
      
    } catch (error) {
      addResult(`Login Error: ${error.message}`, 'error');
    }
    
    setTesting(false);
  };

  const testLocalStorage = () => {
    clearResults();
    addResult('=== TESTING LOCAL STORAGE ===');
    
    // Check current auth token
    const authToken = localStorage.getItem('AuthToken');
    addResult(`Current AuthToken: ${authToken || 'NOT SET'}`);
    
    // Test setting token
    const testToken = 'Bearer test_token_12345';
    localStorage.setItem('AuthToken', testToken);
    addResult(`Set test token: ${testToken}`, 'success');
    
    // Verify it was set
    const retrieved = localStorage.getItem('AuthToken');
    addResult(`Retrieved token: ${retrieved}`);
    
    if (retrieved === testToken) {
      addResult('✅ localStorage is working correctly!', 'success');
    } else {
      addResult('❌ localStorage is NOT working!', 'error');
    }
    
    // Clear test
    addResult('Clearing test token...');
    localStorage.removeItem('AuthToken');
    addResult('Test complete');
  };

  const checkCORS = async () => {
    setTesting(true);
    clearResults();
    
    addResult('=== CHECKING CORS CONFIGURATION ===');
    addResult('This test will show if CORS is blocking requests');
    
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
      });
      
      addResult(`Preflight Status: ${response.status}`);
      
      // Check CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
        'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
      };
      
      addResult(`CORS Headers: ${JSON.stringify(corsHeaders, null, 2)}`);
      
      if (corsHeaders['Access-Control-Allow-Origin']) {
        addResult('✅ CORS appears to be configured!', 'success');
      } else {
        addResult('❌ CORS is NOT configured on backend!', 'error');
        addResult('You need to add CORS middleware to your Firebase Functions', 'error');
      }
      
    } catch (error) {
      addResult(`CORS Test Error: ${error.message}`, 'error');
    }
    
    setTesting(false);
  };

  return (
    <StyledContainer maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🔧 Firebase API Diagnostic Tool
          </Typography>
          
          <Typography variant="body2" color="textSecondary" paragraph>
            This tool will help identify why login/signup isn't working
          </Typography>

          <TextField
            fullWidth
            label="Firebase Functions API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            margin="normal"
            helperText="Update this with your actual Firebase Functions URL"
          />

          <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button 
              variant="contained" 
              onClick={testBasicConnection}
              disabled={testing}
            >
              1. Test Basic Connection
            </Button>
            
            <Button 
              variant="contained" 
              onClick={checkCORS}
              disabled={testing}
              color="secondary"
            >
              2. Check CORS
            </Button>
            
            <Button 
              variant="contained" 
              onClick={testSignup}
              disabled={testing}
              color="success"
            >
              3. Test Signup
            </Button>
            
            <Button 
              variant="contained" 
              onClick={testLogin}
              disabled={testing}
              color="success"
            >
              4. Test Login
            </Button>
            
            <Button 
              variant="contained" 
              onClick={testLocalStorage}
              disabled={testing}
              color="info"
            >
              5. Test localStorage
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={clearResults}
              disabled={testing}
            >
              Clear Results
            </Button>
          </Box>

          {results && (
            <ResultBox>
              {results}
            </ResultBox>
          )}

          <Box sx={{ marginTop: 3, padding: 2, backgroundColor: '#fff3cd', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              <strong>How to use this tool:</strong>
            </Typography>
            <Typography variant="body2" component="div">
              1. Update the API URL above with your Firebase Functions URL<br/>
              2. Click "Test Basic Connection" - this should work even without auth<br/>
              3. Click "Check CORS" - to verify CORS is configured<br/>
              4. Click "Test Signup" - creates a test user<br/>
              5. Click "Test Login" - tries to login (you'll need credentials)<br/>
              6. Watch the results box for detailed information
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </StyledContainer>
  );
}

export default DiagnosticTest;