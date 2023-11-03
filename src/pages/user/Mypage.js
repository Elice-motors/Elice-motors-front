import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DaumPostcode from 'react-daum-postcode';

const Mypage = () => {
  const [user, setUser] = useState({
    name: 'dodo',
    email: 'hido02@naver.com',
    age: 30,
    phoneNumber: '010-XXXX-XXXX',
    address: '123 Main St, City, Country',
  });

  const daum = window.daum;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [isUsingAccountAddress, setUsingAccountAddress] = useState(true);

  const handleComplete = (data) => {
    setPostcode(data.zonecode);
    setAddress(data.address);
    setPostcodeOpen(false); // Close the postcode popup
    // Set the user's address to the selected address
    setUser({ ...user, address: data.address });
  };

  const handleOpenPostcode = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // Daum 우편번호 서비스에서 받아온 주소 데이터 처리
        const fullAddress = data.address;
        setUser({ ...user, address: fullAddress });
      },
    }).open();
  };

  const useAccountAddress = () => {
    const accountAddressValue = 'Account Address Here';
  
    setUsingAccountAddress(true);
    setAddress(accountAddressValue);
    // Set the user's address to the account address
    setUser({ ...user, address: accountAddressValue });
  };

  return (
    <Container maxWidth="sm">
<Typography variant="h5" gutterBottom style={{ fontWeight: 'bold' }}>
  계정 정보 수정
</Typography>
      <form>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          이름
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.name}
          onChange={handleInputChange}
          name="name"
        />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          이메일
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.email}
          onChange={handleInputChange}
          name="email"
        />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          나이
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.age}
          onChange={handleInputChange}
          name="age"
        />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          전화번호
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={user.phoneNumber}
          onChange={handleInputChange}
          name="phoneNumber"
        />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          배송지 주소
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          value={isUsingAccountAddress ? user.address : `${postcode} ${address}`}
          onClick={() => setPostcodeOpen(true)}
        />
        <Dialog open={isPostcodeOpen} onClose={() => setPostcodeOpen(false)}
          sx={{ '& .MuiDialog-paper': { width: '80%', height: '80%' } }}>
          <DialogTitle>배송지 주소 입력</DialogTitle>
          <DialogContent>
            <DaumPostcode onComplete={handleComplete} />
          </DialogContent>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
            >
              계정 정보 변경
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              fullWidth
            >
              탈퇴하기
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Mypage;
