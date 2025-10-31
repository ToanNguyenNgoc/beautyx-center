/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import { ReqLoginGovBtx } from "app/@types";
import { Api } from "app/api";
import { InitAlert } from "app/components";
import { Loading } from "app/components/LoadingPage/LoadingPage";
import { ResGovBtxMobile } from "app/interface";
import { FC, Fragment, useEffect, useState } from "react";
import { encode, decode } from "js-base64"

const formatNumber = (num: any) => new Intl.NumberFormat("vi-VN").format(num ?? 0);

const Token = {
  set: (token: string) => sessionStorage.setItem('_rp_token', token),
  get: () => {
    let UserName;
    let PassWord;
    try {
      const payload = JSON.parse(decode(sessionStorage.getItem('_rp_token') || ''));
      UserName = payload.UserName;
      PassWord = payload.PassWord;
    } catch (error) {
      console.log(error);
    }
    return { UserName, PassWord }
  }
}

export const GovBeautyxMobile: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [report, setReport] = useState<ResGovBtxMobile>();
  const onGetGovBtxMobile = async (body: ReqLoginGovBtx) => {
    Loading.show();
    try {
      const response = await Api.GovBtxMobile.post(body);
      Token.set(encode(JSON.stringify({ UserName: username, PassWord: password })));
      setReport(response);
    } catch (error) {
      InitAlert.open({ title: "Tài khoản hoặc mật khẩu không đúng", type: "error" });
    } finally {
      Loading.off();
    }
  };
  useEffect(() => {
    const { UserName, PassWord } = Token.get();
    if (UserName && PassWord) {
      onGetGovBtxMobile({ UserName, PassWord })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetGovBtxMobile({ UserName: username, PassWord: password });
  };

  const successTotal = (report?.tongSoDonHangThanhCong ?? 0) + (report?.tongSoDonHangKhongThanhCong ?? 0);
  const successPercent = successTotal
    ? Math.round(((report?.tongSoDonHangThanhCong ?? 0) / successTotal) * 100)
    : 0;

  return (
    <Container maxWidth="xs" sx={{ mt: 6, pb: 4 }}>
      {!report ? (
        <Fragment>
          <Typography variant="h5" align="center" gutterBottom>
            Đăng nhập
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Đăng nhập
            </Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          {/* Header */}
          <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Thống kê tổng quan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cập nhật theo dữ liệu mới nhất
              </Typography>
            </Box>
          </Box>

          {/* Stats cards */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Số lượt truy cập
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {formatNumber(report.soLuongTruyCap)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Người bán
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h5" fontWeight={700}>
                      {formatNumber(report.soNguoiBan)}
                    </Typography>
                    {report.soNguoiBanMoi ? (
                      <Chip label={`+${report.soNguoiBanMoi}`} size="small" color="success" />
                    ) : (
                      <Chip label="+0" size="small" />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Tổng số dịch vụ
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h5" fontWeight={700}>
                      {formatNumber(report.tongSoDichVu)}
                    </Typography>
                    {report.soDichVuMoi ? (
                      <Chip label={`+${report.soDichVuMoi}`} size="small" color="success" />
                    ) : (
                      <Chip label="+0" size="small" />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Giao dịch
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {formatNumber(report.soLuongGiaoDich)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Đơn hàng */}
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Đơn hàng
              </Typography>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Thành công
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formatNumber(report.tongSoDonHangThanhCong)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Không thành công
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {formatNumber(report.tongSoDonHangKhongThanhCong)}
                </Typography>
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="caption" color="text.secondary">
                Tỉ lệ thành công
              </Typography>
              <LinearProgress
                variant="determinate"
                value={successPercent}
                sx={{ borderRadius: 999, height: 8, mt: 0.5 }}
              />
              <Typography variant="body2" mt={0.5}>
                {successPercent}% đơn thành công
              </Typography>
            </CardContent>
          </Card>

          {/* Tổng giá trị */}
          <Card variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Tổng giá trị giao dịch
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary">
                {formatNumber(report.tongGiaTriGiaoDich)} ₫
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                (Từ {formatNumber(successTotal)} đơn)
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
      )}
    </Container>
  );
};
