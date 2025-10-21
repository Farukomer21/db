import { z as zod } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "minimal-shared/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "src/routes/hooks";

import { Iconify } from "src/components/iconify";
import { Form, Field } from "src/components/hook-form";
import { AnimateLogoRotate } from "src/components/animate";

import { useAuthContext } from "../hooks";
import { getErrorMessage } from "../utils";
import { signInWithPassword } from "../context/jwt";
import { FormHead } from "../components/form-head.jsx";

const PasswordInfoBox = () => {
  const superAdminEmail = "omerfarukaydon@gmail.com";
  const superAdminPassword = "Mindbricks321";
  const projectName = "Hotel Data Backend";

  // Only show warning if using default admin credentials
  const isDefaultCredentials =
    (superAdminEmail === "admin@admin.com" ||
      superAdminEmail === "admin@admin.com") &&
    superAdminPassword === "superadmin";

  if (!isDefaultCredentials) return null;

  return (
    <Box
      className="password-info"
      id="password-info"
      sx={{
        mb: 3,
        p: 2,
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        borderRadius: 1,
        fontSize: "0.875rem",
      }}
    >
      <p style={{ margin: "0 0 12px 0", fontWeight: 500 }}>
        Your <strong>superAdmin</strong> account credentials are currently set
        to default values.
      </p>
      <p style={{ margin: "0 0 12px 0" }}>
        <strong>Username:</strong>{" "}
        <code
          style={{
            backgroundColor: "#e9ecef",
            padding: "2px 4px",
            borderRadius: "3px",
            fontFamily: "monospace",
          }}
        >
          {superAdminEmail}
        </code>
        <br />
        <strong>Password:</strong>{" "}
        <code
          style={{
            backgroundColor: "#e9ecef",
            padding: "2px 4px",
            borderRadius: "3px",
            fontFamily: "monospace",
          }}
        >
          {superAdminPassword}
        </code>
      </p>
      <p style={{ margin: "0 0 12px 0" }}>
        You can log in with these credentials as the root user. It is highly
        recommended to update them as soon as possible.
      </p>
      <p
        style={{
          margin: "12px 0 0 0",
          fontSize: "0.9em",
          color: "#555",
        }}
      >
        To change these credentials, navigate to:
        <br />
        <strong>
          Mindbricks › {projectName} › Authentication › Login Definition › User
          Settings
        </strong>
      </p>
    </Box>
  );
};

export const LoginSchema = zod.object({
  username: zod.string().min(1, { message: "User name is required!" }),
  password: zod.string().min(1, { message: "Password is required!" }),
});

export function LoginView() {
  const router = useRouter();

  const showPassword = useBoolean();

  const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState("");

  const defaultValues = {
    username: "",
    password: "",
  };

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({
        username: data.username,
        password: data.password,
      });
      await checkUserSession?.();

      router.push("/panel");
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: "flex", flexDirection: "column" }}>
      <Field.Text
        name="username"
        label="User name"
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <Box sx={{ gap: 1.5, display: "flex", flexDirection: "column" }}>
        <Field.Text
          name="password"
          label="Password"
          type={showPassword.value ? "text" : "password"}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={
                        showPassword.value
                          ? "solar:eye-bold"
                          : "solar:eye-closed-bold"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: "auto" }} />

      <FormHead
        title="Sign in to your account"
        description="Hotel Data Backend"
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <PasswordInfoBox />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}
