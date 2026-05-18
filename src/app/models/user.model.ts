export interface User {
  _id:          string;
  name:         string;
  email:        string;
  phone:        string;
  organization?: string;
  address?:     string;
  city?:        string;
  state?:       string;
  pincode?:     string;
  isAdmin:      boolean;
  createdAt:    string;
}

export interface AuthResponse {
  token: string;
  user:  User;
}
