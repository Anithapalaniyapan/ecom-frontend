// Profile page types and interfaces
export enum ProfileSection {
  PERSONAL_INFO = 'personal-info',
  ORDER_HISTORY = 'order-history',
  ACCOUNT_SETTINGS = 'account-settings',
  MY_PRODUCTS = 'my-products',
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role: 'customer' | 'seller' | 'admin';
  isActive: boolean;
  emailVerified: boolean;
  profilePicture?: string;
  // Seller-specific fields
  businessName?: string;
  businessDescription?: string;
  businessLicense?: string;
  taxId?: string;
  isVerifiedSeller?: boolean;
}

export interface Order {
  id: string;
  orderId: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

export interface NavigationItem {
  id: ProfileSection;
  label: string;
  icon: React.ComponentType;
}

