export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string
};

export type ContactsResponse = {
  message: string;
  contacts: Contact[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    prev: boolean;
    next: boolean;
  };
};
