import { Button, CircularProgress } from "@mui/material";

interface Props {
  loading: boolean;
  disabled?: boolean;
  text: string;
  loadingText: string;
  type?: "button" | "submit";
}

export function LoadingButton({
  loading,
  disabled,
  text,
  loadingText,
  type = "button",
}: Props) {
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth
      size="large"
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <CircularProgress size={18} color="inherit" />
          {loadingText}
        </div>
      ) : (
        text
      )}
    </Button>
  );
}
