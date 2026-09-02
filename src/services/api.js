const API_URL = "https://ed-backend-zxr4.onrender.com/api/v1"


export async function loginUser(identifier, password) {
    const response = await fetch(`${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
            password
          })

        }
      )
      const data = await response.json()
      if (!response.ok) {
         throw new Error(
            data.message ||
            data.error ||
            "Invalid login credentials"
        )
    }
    return data
}

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || data.error || "Registration failed")
    }
    return data
}

export async function verifyEmail(code) {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code
    }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Email verification failed")
  }
  return data
}


// First name: Test
// Last name: Nurse
// Email: testnurse2026@example.com
// Staff ID: TEST-NURSE-002
// Role: Nurse
// Password: Password123!
// Confirm Password: Password123!