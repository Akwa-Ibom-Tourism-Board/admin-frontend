/* eslint-disable @typescript-eslint/no-explicit-any */
export const validations = {
  email: (value: string): string | null => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    const domain = value.split('@')[1];
    const typos: Record<string, string> = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
    };
    if (typos[domain]) {
      return `Did you mean ${value.split('@')[0]}@${typos[domain]}?`;
    }
    return null;
  },

  nigerianPhone: (value: string): string | null => {
    if (!value) return 'Phone number is required';
    const cleaned = value.replace(/[\s\-+]/g, '');
    const localFormat = /^0[789][01]\d{8}$/;
    const intlFormat = /^234[789][01]\d{8}$/;

    if (!localFormat.test(cleaned) && !intlFormat.test(cleaned)) {
      return 'Invalid Nigerian phone number. Format: 0803XXXXXXX or 234803XXXXXXX';
    }
    return null;
  },

  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  year: (value: string): string | null => {
    if (!value) return 'Year is required';
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      return `Year must be between 1900 and ${currentYear}`;
    }
    return null;
  },

  number: (value: string): string | null => {
    if (!value) return 'This field is required';
    if (isNaN(Number(value)) || Number(value) <= 0) {
      return 'Please enter a valid positive number';
    }
    return null;
  },

  website: (value: string): string | null => {
    if (!value) return 'Website URL is required';
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(value)) return 'Please enter a valid URL';
    return null;
  },
};