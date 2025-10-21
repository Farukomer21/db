# AUTHENTICATION FLOW

## Db Admin Panel

This document provides comprehensive information about the authentication system implemented in the Db Admin Panel, including login flows, token management, session handling, and security considerations.

## Architectural Design Credit and Contact Information

The architectural design of this authentication system is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this authentication system.

## Documentation Scope

This guide covers the complete authentication flow within the Db Admin Panel. It includes login processes, token management, session handling, multi-tenant support, and security best practices.

**Intended Audience**

This documentation is intended for frontend developers, security engineers, and system administrators who need to understand, implement, or maintain the authentication system within the admin panel.

## Authentication Architecture

### Overview

The admin panel implements a comprehensive authentication system that integrates with the project's authentication service. It supports JWT-based authentication, session management, and cross-domain authentication.

### Authentication Components

**Core Components**

- **Auth Service Integration**: Communication with backend authentication service
- **Token Management**: JWT token storage and validation
- **Session Management**: User session state and persistence
- **Route Protection**: Authentication guards for protected routes
- **Cross-Domain Authentication**: Support for cross-domain cookie authentication

## Login Flow

### Standard Login Process

**Step 1: Login Form Display**
The login form uses React Hook Form with Zod validation for username and password fields.

**Step 2: Credential Submission**

```javascript
const onSubmit = handleSubmit(async (data) => {
  try {
    await signInWithPassword({
      username: data.username,
      password: data.password,
    });
    await checkUserSession?.();
    router.push("/panel");
  } catch (error) {
    const feedbackMessage = getErrorMessage(error);
    setErrorMessage(feedbackMessage);
  }
});
```

**Step 3: Session Establishment**
The session is established through the `setSession` utility which stores the JWT token in sessionStorage and sets up cross-tab communication.

### Cross-Domain Authentication

The admin panel supports cross-domain authentication through cookie-based token sharing:

**Cross-Domain Token Detection**

```javascript
export function getCrossDomainAuthToken() {
  const projectCodename = "db";
  const cookieName = `${projectCodename}-access-token`;
  return getCookie(cookieName);
}
```

**Cross-Domain Session Validation**

```javascript
export async function validateCrossDomainSession(accessToken) {
  try {
    if (!accessToken || !isValidToken(accessToken)) {
      return null;
    }

    const decodedToken = jwtDecode(accessToken);
    if (!decodedToken?.userId) {
      return null;
    }

    const res = await authAxios.get(`/v1/users/${decodedToken.userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data?.user || null;
  } catch (error) {
    console.error("Error validating cross-domain session:", error);
    return null;
  }
}
```

## Token Management

### JWT Token Handling

**Token Storage**

```javascript
export async function setSession(accessToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);

      // Trigger custom event for cross-tab communication
      window.dispatchEvent(
        new CustomEvent("auth-session-changed", {
          detail: { action: "login", token: accessToken },
        }),
      );

      // Set authorization headers for all service clients

      guestManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      roomInventoryAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      reservationManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      packageManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      packageReservationMappingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      specialRequestManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      paymentManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      roomPricingAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      feedbackManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      personnelManagementAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      authAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);
      if (!decodedToken) {
        throw new Error("Invalid access token!");
      }
      return decodedToken;
    } else {
      // Clear session
      sessionStorage.removeItem(JWT_STORAGE_KEY);
      window.dispatchEvent(
        new CustomEvent("auth-session-changed", {
          detail: { action: "logout", token: null },
        }),
      );

      delete guestManagementAxios.defaults.headers.common.Authorization;

      delete roomInventoryAxios.defaults.headers.common.Authorization;

      delete reservationManagementAxios.defaults.headers.common.Authorization;

      delete packageManagementAxios.defaults.headers.common.Authorization;

      delete packageReservationMappingAxios.defaults.headers.common
        .Authorization;

      delete specialRequestManagementAxios.defaults.headers.common
        .Authorization;

      delete paymentManagementAxios.defaults.headers.common.Authorization;

      delete roomPricingAxios.defaults.headers.common.Authorization;

      delete feedbackManagementAxios.defaults.headers.common.Authorization;

      delete personnelManagementAxios.defaults.headers.common.Authorization;

      delete authAxios.defaults.headers.common.Authorization;

      return null;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}
```

**Token Validation**

```javascript
export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    return jwtDecode(accessToken);
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
}
```

### Session Management

**AuthProvider Implementation**

```javascript
export function AuthProvider({ children }) {
  const { state, setState } = useSetState({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      // First, check for existing session in sessionStorage
      let accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);
      let user = null;

      if (accessToken && isValidToken(accessToken)) {
        // Validate existing session
        const decodedToken = await setSession(accessToken);
        const res = await authAxios.get(
          `${authEndpoints.me.replace(":userId", decodedToken?.userId)}`,
        );
        user = res.data?.user;
      } else if (canAccessCrossDomainCookies()) {
        // Check for cross-domain authentication cookie
        const crossDomainToken = getCrossDomainAuthToken();
        if (crossDomainToken) {
          user = await validateCrossDomainSession(crossDomainToken);

          if (user) {
            await setSession(crossDomainToken);
            accessToken = crossDomainToken;
          }
        }
      }

      if (user && accessToken) {
        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error("Error checking user session:", error);
      setState({ user: null, loading: false });
    }
  }, []);

  // ... rest of implementation
}
```

### Role-Based Access Control

**RoleBasedGuard Implementation**

```javascript
export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentRole,
  acceptRoles,
}) {
  if (
    typeof acceptRoles !== "undefined" &&
    !acceptRoles.includes(currentRole)
  ) {
    return hasContent ? (
      <Container
        component={MotionContainer}
        sx={[{ textAlign: "center" }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <m.div variants={varBounce("in")}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>
        <m.div variants={varBounce("in")}>
          <Typography sx={{ color: "text.secondary" }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>
        <m.div variants={varBounce("in")}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
```

## Logout Flow

### Logout Process

**Logout Implementation**

```javascript
export const signOut = async () => {
  try {
    await authAxios.post(authEndpoints.logout);
    await setSession(null);
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};
```

**Session Cleanup**
The `setSession(null)` function handles all cleanup:

- Removes JWT token from sessionStorage
- Triggers cross-tab logout event
- Clears authorization headers from all service clients
- Returns null to indicate no active session

## Security Considerations

### Token Security

**JWT Token Validation**

```javascript
export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid token!");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}
```

### Input Validation

**Login Form Validation**
The login form uses Zod schema validation:

```javascript
export const LoginSchema = zod.object({
  username: zod.string().min(1, { message: "User name is required!" }),
  password: zod.string().min(1, { message: "Password is required!" }),
});
```

## Error Handling

### Authentication Errors

**Error Message Handling**

```javascript
// Error messages are displayed to users
// Basic error handling is implemented
```

The admin panel uses a centralized error message utility (`getErrorMessage`) to handle authentication errors and display user-friendly messages.
