import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import QRCode from 'react-qr-code';

// Create a Rabobank-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6600',
      contrastText: '#fff',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '10px 24px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

export default function BankDemo() {
  const [step, setStep] = useState(0);
  const [kvkNumber, setKvkNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    if (step === 0 && !kvkNumber) {
      alert('Please enter your KVK number');
      return;
    }
    setStep(step + 1);
  };

  const startVerification = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsVerified(true);
      setStep(2);
    }, 3000);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 4,
            p: 4
          }}>
            <Typography variant="h4" sx={{ color: 'secondary.main', textAlign: 'center' }}>
              Share your KVK number
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '500px' }}>
              To issue your digital bank card, we need to verify your business registration number.
            </Typography>
            <TextField
              fullWidth
              label="KVK Number"
              value={kvkNumber}
              onChange={(e) => setKvkNumber(e.target.value)}
              sx={{ maxWidth: '300px' }}
            />
            <Button
              variant="contained"
              onClick={handleContinue}
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 4,
            p: 4
          }}>
            <Typography variant="h4" sx={{ color: 'secondary.main', textAlign: 'center' }}>
              Scan QR code
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '500px' }}>
              Please scan the QR code with your mobile device to verify your identity.
            </Typography>
            {!isScanning && !isVerified ? (
              <>
                <Box sx={{ 
                  p: 4,
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <QRCode
                    value="https://example.com/verify"
                    level="H"
                    style={{ width: '200px', height: '200px' }}
                  />
                </Box>
                <Button 
                  variant="contained" 
                  onClick={startVerification}
                >
                  Start Verification
                </Button>
              </>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                p: 4 
              }}>
                <CircularProgress sx={{ mb: 2, color: 'primary.main' }} />
                <Typography>Scanning QR code...</Typography>
              </Box>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 4,
            p: 4
          }}>
            <Typography variant="h4" sx={{ color: 'primary.main', textAlign: 'center' }}>
              Success!
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '500px' }}>
              Your digital bank card has been successfully issued and added to your wallet.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default'
      }}>
        {renderStep()}
      </Box>
    </ThemeProvider>
  );
}
