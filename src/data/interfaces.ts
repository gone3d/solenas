// Centralized interface definitions for the Solace Advocates application

// Core data models
export interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: string;
}

// API response interfaces
export interface AdvocateResponse {
  data: Advocate[];
}

// Component prop interfaces
export interface UiButtonProps {
  buttonLabel: string;
  buttonCallback: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SearchProps {
  advocates: Advocate[];
  onFilter: (filteredAdvocates: Advocate[]) => void;
}

export interface AdvocateTableProps {
  advocates: Advocate[];
  className?: string;
  onShowModal: (advocate: Advocate) => void;
}

export interface AdvocateTableItemProps {
  advocate: Advocate;
  onShowModal: (advocate: Advocate) => void;
}

export interface AdvocateModalProps {
  advocate: Advocate | null;
  isOpen: boolean;
  onClose: () => void;
}