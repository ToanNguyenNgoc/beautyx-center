import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
} from "@mui/material";

interface AIGenerateDialogProps {
    open: boolean;
    prompt: string;
    onChange: (value: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

const AIGenerateDialog: React.FC<AIGenerateDialogProps> = ({
    open,
    prompt,
    onChange,
    onClose,
    onSubmit,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false} 
            PaperProps={{
                sx: {
                    width: 500, 
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontWeight: 700,
                }}
            >
                Tạo nội dung AI
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    sx={{
                        fontFamily: "Arial, Helvetica, sans-serif",
                        mb: 1,
                        color: "text.secondary",
                    }}
                >
                    Nhập mô tả (prompt) bạn muốn tạo:
                </Box>
                <TextField
                    autoFocus
                    fullWidth
                    multiline
                    minRows={3}
                    value={prompt}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Ví dụ: Tạo mô tả dịch vụ nổi bật cho chiến dịch GMUP..."
                    InputProps={{
                        sx: { fontFamily: "Arial, Helvetica, sans-serif" },
                    }}
                    InputLabelProps={{
                        sx: { fontFamily: "Arial, Helvetica, sans-serif" },
                    }}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Đóng
                </Button>
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={!prompt.trim()}
                >
                    Tạo
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AIGenerateDialog;
